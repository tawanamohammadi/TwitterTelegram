import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Basic user model for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Configuration model
export const config = pgTable("config", {
  id: serial("id").primaryKey(),
  twitterAccount: text("twitter_account").notNull().default("unwomen"),
  checkInterval: integer("check_interval").notNull().default(15),
  twitterApiKey: text("twitter_api_key").notNull(),
  twitterApiSecret: text("twitter_api_secret").notNull(),
  twitterBearerToken: text("twitter_bearer_token").notNull(),
  telegramToken: text("telegram_token").notNull(),
  telegramChannel: text("telegram_channel").notNull(),
  messageTemplate: text("message_template").notNull().default('📢 *New tweet from @unwomen*\n\n{tweet_text}\n\n🔗 [View on Twitter]({tweet_url})'),
  includeImages: boolean("include_images").notNull().default(true),
  serviceActive: boolean("service_active").notNull().default(true),
  lastCheck: timestamp("last_check"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertConfigSchema = createInsertSchema(config).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastCheck: true,
});

export const updateConfigSchema = insertConfigSchema.partial();

export type InsertConfig = z.infer<typeof insertConfigSchema>;
export type UpdateConfig = z.infer<typeof updateConfigSchema>;
export type Config = typeof config.$inferSelect;

// Log model
export const logs = pgTable("logs", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  message: text("message").notNull(),
  details: text("details"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertLogSchema = createInsertSchema(logs).omit({
  id: true,
  timestamp: true,
});

export type InsertLog = z.infer<typeof insertLogSchema>;
export type Log = typeof logs.$inferSelect;

// Tweet model to track which tweets have been processed
export const tweets = pgTable("tweets", {
  id: serial("id").primaryKey(),
  tweetId: text("tweet_id").notNull().unique(),
  text: text("text").notNull(),
  url: text("url").notNull(),
  processedAt: timestamp("processed_at").defaultNow(),
});

export const insertTweetSchema = createInsertSchema(tweets).omit({
  id: true,
  processedAt: true,
});

export type InsertTweet = z.infer<typeof insertTweetSchema>;
export type Tweet = typeof tweets.$inferSelect;

// Stats model
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  tweetsForwarded: integer("tweets_forwarded").notNull().default(0),
  serviceStartTime: timestamp("service_start_time").defaultNow(),
  lastReset: timestamp("last_reset").defaultNow(),
});

export const updateStatsSchema = createInsertSchema(stats)
  .omit({
    id: true,
    serviceStartTime: true,
    lastReset: true,
  })
  .partial();

export type UpdateStats = z.infer<typeof updateStatsSchema>;
export type Stats = typeof stats.$inferSelect;
