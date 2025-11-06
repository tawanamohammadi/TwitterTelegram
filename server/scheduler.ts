import { schedule, ScheduledTask } from 'node-cron';
import { storage } from './storage';
import { createTwitterClient } from './twitter';
import { createTelegramClient } from './telegram';

let scheduledTask: ScheduledTask | null = null;

// Process new tweets and forward them to Telegram
async function processNewTweets(): Promise<void> {
  // Get config
  const config = await storage.getConfig();
  if (!config) {
    await storage.createLog({
      type: 'error',
      message: 'Failed to load configuration',
    });
    return;
  }
  
  // Check if service is active
  if (!config.serviceActive) {
    return;
  }
  
  // Create API clients
  const twitterClient = createTwitterClient();
  const telegramClient = createTelegramClient();
  
  if (!twitterClient || !telegramClient) {
    await storage.createLog({
      type: 'error',
      message: 'API clients could not be initialized',
    });
    return;
  }
  
  try {
    // Log check start
    await storage.createLog({
      type: 'info',
      message: 'Checking for new tweets',
    });
    
    // Update last check time
    await storage.updateConfig({
      lastCheck: new Date(),
    });
    
    // Get latest tweets
    const { tweets, media } = await twitterClient.getLatestTweets(config.twitterAccount, 5);
    
    // Process each tweet
    let newTweetsCount = 0;
    
    for (const tweet of tweets) {
      // Check if we've already processed this tweet
      const existingTweet = await storage.getTweet(tweet.id);
      if (existingTweet) {
        continue;
      }
      
      // Format the tweet
      const tweetUrl = twitterClient.getTweetUrl(config.twitterAccount, tweet.id);
      
      // Save the tweet
      await storage.createTweet({
        tweetId: tweet.id,
        text: tweet.text,
        url: tweetUrl,
      });
      
      // Apply message template
      let messageText = config.messageTemplate
        .replace('{tweet_text}', tweet.text)
        .replace('{tweet_url}', tweetUrl);
      
      // Send to Telegram
      const success = await telegramClient.sendMessage(config.telegramChannel, messageText, {
        parse_mode: 'Markdown',
        disable_web_page_preview: false,
      });
      
      // If configured to include images and tweet has media
      if (success && config.includeImages && tweet.attachments?.media_keys?.length) {
        // Find media for this tweet
        for (const mediaKey of tweet.attachments.media_keys) {
          const mediaItem = media.find(m => m.media_key === mediaKey);
          if (mediaItem && mediaItem.url) {
            // Send the image
            await telegramClient.sendPhoto(config.telegramChannel, mediaItem.url);
          }
        }
      }
      
      if (success) {
        // Log successful forwarding
        await storage.createLog({
          type: 'success',
          message: 'Tweet forwarded',
          details: tweet.text,
        });
        
        // Increment counter
        newTweetsCount++;
      }
    }
    
    // Update stats if new tweets were found
    if (newTweetsCount > 0) {
      const stats = await storage.getStats();
      if (stats) {
        await storage.updateStats({
          tweetsForwarded: stats.tweetsForwarded + newTweetsCount,
        });
      }
    } else {
      // Log no new tweets
      await storage.createLog({
        type: 'info',
        message: 'No new tweets found',
      });
    }
  } catch (error) {
    // Log error
    await storage.createLog({
      type: 'error',
      message: 'Error processing tweets',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

// Initialize scheduler
export async function initializeScheduler(): Promise<void> {
  try {
    // Get config
    const config = await storage.getConfig();
    if (!config) {
      throw new Error('Configuration not found');
    }
    
    // Set up the scheduler based on the check interval
    scheduleTask(config.checkInterval);
    
    // Log scheduler initialization
    await storage.createLog({
      type: 'info',
      message: `Scheduler initialized with ${config.checkInterval} minute interval`,
    });
  } catch (error) {
    // Log error
    await storage.createLog({
      type: 'error',
      message: 'Failed to initialize scheduler',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

// Schedule task with given interval
export function scheduleTask(intervalMinutes: number): void {
  // Clear existing task if any
  if (scheduledTask) {
    scheduledTask.stop();
  }
  
  // Create cron expression based on interval
  // Run every X minutes
  const cronExpression = `*/${intervalMinutes} * * * *`;
  
  // Schedule new task
  scheduledTask = schedule(cronExpression, async () => {
    await processNewTweets();
  });
}

// Stop scheduler
export function stopScheduler(): void {
  if (scheduledTask) {
    scheduledTask.stop();
    scheduledTask = null;
  }
}

// Manually trigger tweet check
export async function checkNow(): Promise<void> {
  await processNewTweets();
}

// Reset service stats
export async function resetService(): Promise<void> {
  await storage.resetStats();
  await storage.createLog({
    type: 'info',
    message: 'Service stats reset',
  });
}
