import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { initializeScheduler, scheduleTask, stopScheduler, checkNow, resetService } from "./scheduler";
import { createTelegramClient } from "./telegram";
import { updateConfigSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Initialize the scheduler when server starts
  await initializeScheduler();
  
  // Error handling middleware
  const handleError = (err: any, res: Response) => {
    console.error(err);
    
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return res.status(400).json({ message: validationError.message });
    }
    
    return res.status(500).json({ message: err.message || 'Internal server error' });
  };
  
  // ROUTES
  
  // Get service configuration
  app.get('/api/config', async (req: Request, res: Response) => {
    try {
      const config = await storage.getConfig();
      if (!config) {
        return res.status(404).json({ message: 'Configuration not found' });
      }
      
      // Don't expose sensitive info
      const safeConfig = {
        ...config,
        twitterApiKey: config.twitterApiKey ? '••••••••••••••••' : '',
        twitterApiSecret: config.twitterApiSecret ? '••••••••••••••••' : '',
        twitterBearerToken: config.twitterBearerToken ? '••••••••••••••••' : '',
        telegramToken: config.telegramToken ? '••••••••••••••••' : '',
      };
      
      res.json(safeConfig);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Update service configuration
  app.post('/api/config', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const updatedConfig = updateConfigSchema.parse(req.body);
      
      // Update config in storage
      const config = await storage.updateConfig(updatedConfig);
      
      // If changing check interval, reschedule
      if (typeof updatedConfig.checkInterval === 'number') {
        scheduleTask(updatedConfig.checkInterval);
      }
      
      // If toggling service activity
      if (typeof updatedConfig.serviceActive === 'boolean') {
        if (updatedConfig.serviceActive) {
          // Restart scheduler if needed
          await initializeScheduler();
        } else {
          // Stop scheduler
          stopScheduler();
        }
      }
      
      // Log the change
      await storage.createLog({
        type: 'info',
        message: 'Configuration updated',
      });
      
      // Return safe config (no sensitive info)
      const safeConfig = {
        ...config,
        twitterApiKey: config.twitterApiKey ? '••••••••••••••••' : '',
        twitterApiSecret: config.twitterApiSecret ? '••••••••••••••••' : '',
        twitterBearerToken: config.twitterBearerToken ? '••••••••••••••••' : '',
        telegramToken: config.telegramToken ? '••••••••••••••••' : '',
      };
      
      res.json(safeConfig);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Get service stats
  app.get('/api/stats', async (req: Request, res: Response) => {
    try {
      const stats = await storage.getStats();
      
      if (!stats) {
        return res.status(404).json({ message: 'Stats not found' });
      }
      
      const config = await storage.getConfig();
      
      // Calculate uptime
      const uptime = stats.serviceStartTime 
        ? Math.floor((Date.now() - stats.serviceStartTime.getTime()) / 1000)
        : 0;
      
      // Calculate next check
      let nextCheck = 0;
      if (config?.serviceActive && config?.lastCheck && config?.checkInterval) {
        const nextCheckTime = new Date(config.lastCheck.getTime() + (config.checkInterval * 60 * 1000));
        nextCheck = Math.max(0, Math.floor((nextCheckTime.getTime() - Date.now()) / 1000));
      }
      
      res.json({
        ...stats,
        uptime,
        nextCheck,
      });
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Get logs
  app.get('/api/logs', async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const logs = await storage.getLogs(limit);
      res.json(logs);
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Manual check for new tweets
  app.post('/api/check-now', async (req: Request, res: Response) => {
    try {
      await checkNow();
      res.json({ message: 'Manual check initiated' });
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Send test message to Telegram
  app.post('/api/test-telegram', async (req: Request, res: Response) => {
    try {
      const config = await storage.getConfig();
      
      if (!config) {
        return res.status(404).json({ message: 'Configuration not found' });
      }
      
      const telegramClient = createTelegramClient();
      
      if (!telegramClient) {
        return res.status(500).json({ message: 'Telegram client could not be initialized' });
      }
      
      const success = await telegramClient.sendTestMessage(config.telegramChannel);
      
      if (success) {
        await storage.createLog({
          type: 'info',
          message: 'Test message sent to Telegram',
        });
        
        res.json({ message: 'Test message sent successfully' });
      } else {
        res.status(500).json({ message: 'Failed to send test message' });
      }
    } catch (err) {
      handleError(err, res);
    }
  });
  
  // Reset service
  app.post('/api/reset', async (req: Request, res: Response) => {
    try {
      await resetService();
      res.json({ message: 'Service reset successfully' });
    } catch (err) {
      handleError(err, res);
    }
  });
  
  return httpServer;
}
