import { 
  users, type User, type InsertUser,
  config, type Config, type InsertConfig, type UpdateConfig,
  logs, type Log, type InsertLog,
  tweets, type Tweet, type InsertTweet,
  stats, type Stats, type UpdateStats
} from "@shared/schema";

// Interface for storage methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Config methods
  getConfig(): Promise<Config | undefined>;
  updateConfig(config: UpdateConfig): Promise<Config>;
  
  // Log methods
  getLogs(limit?: number): Promise<Log[]>;
  createLog(log: InsertLog): Promise<Log>;
  
  // Tweet methods
  getTweet(tweetId: string): Promise<Tweet | undefined>;
  createTweet(tweet: InsertTweet): Promise<Tweet>;
  
  // Stats methods
  getStats(): Promise<Stats | undefined>;
  updateStats(stats: UpdateStats): Promise<Stats>;
  resetStats(): Promise<Stats>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private configRecord: Config | undefined;
  private logs: Log[];
  private tweets: Map<string, Tweet>;
  private statsRecord: Stats | undefined;
  
  private userId: number;
  private logId: number;
  private tweetId: number;
  
  constructor() {
    this.users = new Map();
    this.logs = [];
    this.tweets = new Map();
    
    this.userId = 1;
    this.logId = 1;
    this.tweetId = 1;
    
    // Initialize with default config
    this.configRecord = {
      id: 1,
      twitterAccount: "unwomen",
      checkInterval: 15,
      twitterApiKey: "",
      twitterApiSecret: "",
      twitterBearerToken: "",
      telegramToken: "",
      telegramChannel: "",
      messageTemplate: '📢 *New tweet from @unwomen*\n\n{tweet_text}\n\n🔗 [View on Twitter]({tweet_url})',
      includeImages: true,
      serviceActive: true,
      lastCheck: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Initialize with default stats
    this.statsRecord = {
      id: 1,
      tweetsForwarded: 0,
      serviceStartTime: new Date(),
      lastReset: new Date(),
    };
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Config methods
  async getConfig(): Promise<Config | undefined> {
    return this.configRecord;
  }
  
  async updateConfig(updateConfig: UpdateConfig): Promise<Config> {
    if (!this.configRecord) {
      throw new Error("Config not initialized");
    }
    
    this.configRecord = {
      ...this.configRecord,
      ...updateConfig,
      updatedAt: new Date(),
    };
    
    return this.configRecord;
  }
  
  // Log methods
  async getLogs(limit?: number): Promise<Log[]> {
    const sortedLogs = [...this.logs].sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    );
    
    if (limit) {
      return sortedLogs.slice(0, limit);
    }
    
    return sortedLogs;
  }
  
  async createLog(insertLog: InsertLog): Promise<Log> {
    const id = this.logId++;
    const log: Log = {
      ...insertLog,
      id,
      timestamp: new Date(),
    };
    
    this.logs.push(log);
    return log;
  }
  
  // Tweet methods
  async getTweet(tweetId: string): Promise<Tweet | undefined> {
    return this.tweets.get(tweetId);
  }
  
  async createTweet(insertTweet: InsertTweet): Promise<Tweet> {
    const id = this.tweetId++;
    const tweet: Tweet = {
      ...insertTweet,
      id,
      processedAt: new Date(),
    };
    
    this.tweets.set(insertTweet.tweetId, tweet);
    return tweet;
  }
  
  // Stats methods
  async getStats(): Promise<Stats | undefined> {
    return this.statsRecord;
  }
  
  async updateStats(updateStats: UpdateStats): Promise<Stats> {
    if (!this.statsRecord) {
      throw new Error("Stats not initialized");
    }
    
    this.statsRecord = {
      ...this.statsRecord,
      ...updateStats,
    };
    
    return this.statsRecord;
  }
  
  async resetStats(): Promise<Stats> {
    if (!this.statsRecord) {
      throw new Error("Stats not initialized");
    }
    
    this.statsRecord = {
      ...this.statsRecord,
      tweetsForwarded: 0,
      lastReset: new Date(),
    };
    
    return this.statsRecord;
  }
}

// Export storage instance
export const storage = new MemStorage();
