import { storage } from "./storage";

// Telegram message options interface
interface TelegramSendOptions {
  parse_mode?: 'Markdown' | 'HTML';
  disable_web_page_preview?: boolean;
}

// Telegram API client
export class TelegramClient {
  private token: string;
  
  constructor(token: string) {
    this.token = token;
  }
  
  async sendMessage(chatId: string, text: string, options: TelegramSendOptions = {}): Promise<boolean> {
    const apiUrl = `https://api.telegram.org/bot${this.token}/sendMessage`;
    
    const payload = {
      chat_id: chatId,
      text,
      ...options
    };
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Telegram API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
      
      const data = await response.json();
      
      if (!data.ok) {
        throw new Error(`Telegram API returned error: ${data.description}`);
      }
      
      return true;
    } catch (error) {
      // Log the error
      await storage.createLog({
        type: 'error',
        message: 'Failed to send message to Telegram',
        details: error instanceof Error ? error.message : String(error)
      });
      
      return false;
    }
  }
  
  async sendPhoto(chatId: string, photoUrl: string, caption?: string, options: TelegramSendOptions = {}): Promise<boolean> {
    const apiUrl = `https://api.telegram.org/bot${this.token}/sendPhoto`;
    
    const payload = {
      chat_id: chatId,
      photo: photoUrl,
      caption,
      ...options
    };
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Telegram API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
      
      const data = await response.json();
      
      if (!data.ok) {
        throw new Error(`Telegram API returned error: ${data.description}`);
      }
      
      return true;
    } catch (error) {
      // Log the error
      await storage.createLog({
        type: 'error',
        message: 'Failed to send photo to Telegram',
        details: error instanceof Error ? error.message : String(error)
      });
      
      return false;
    }
  }
  
  async sendTestMessage(chatId: string): Promise<boolean> {
    const message = "🧪 *Test Message* 🧪\n\nThis is a test message from the UNFEM Twitter-to-Telegram service. If you're seeing this, the service is properly configured.";
    
    return this.sendMessage(chatId, message, {
      parse_mode: 'Markdown'
    });
  }
}

// Factory function to create Telegram client
export function createTelegramClient(): TelegramClient | null {
  const token = process.env.TELEGRAM_BOT_TOKEN || '';
  
  if (!token) {
    console.error('Telegram bot token not configured');
    return null;
  }
  
  return new TelegramClient(token);
}
