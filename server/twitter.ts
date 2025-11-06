import { storage } from "./storage";
import { z } from "zod";

// Twitter response schemas
const tweetMediaSchema = z.object({
  media_key: z.string(),
  type: z.string(),
  url: z.string().optional(),
});

const tweetAttachmentsSchema = z.object({
  media_keys: z.array(z.string()).optional(),
});

const tweetSchema = z.object({
  id: z.string(),
  text: z.string(),
  created_at: z.string(),
  attachments: tweetAttachmentsSchema.optional(),
});

const tweetResponseSchema = z.object({
  data: z.array(tweetSchema),
  includes: z.object({
    media: z.array(tweetMediaSchema).optional(),
  }).optional(),
  meta: z.object({
    newest_id: z.string().optional(),
    oldest_id: z.string().optional(),
    result_count: z.number(),
  }),
});

// Type definitions from schemas
type Tweet = z.infer<typeof tweetSchema>;
type TweetResponse = z.infer<typeof tweetResponseSchema>;
type TweetMedia = z.infer<typeof tweetMediaSchema>;

// Twitter API client
export class TwitterClient {
  private bearerToken: string;
  private apiKey: string;
  private apiSecret: string;
  
  constructor(apiKey: string, apiSecret: string, bearerToken: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.bearerToken = bearerToken;
  }
  
  async getLatestTweets(username: string, count: number = 10): Promise<{tweets: Tweet[], media: TweetMedia[]}> {
    const url = new URL('https://api.twitter.com/2/tweets/search/recent');
    
    // Set query parameters
    url.searchParams.append('query', `from:${username}`);
    url.searchParams.append('max_results', count.toString());
    url.searchParams.append('tweet.fields', 'created_at,attachments');
    url.searchParams.append('expansions', 'attachments.media_keys');
    url.searchParams.append('media.fields', 'url,preview_image_url,type');
    
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Twitter API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      const parsedResponse = tweetResponseSchema.parse(data);
      
      // Create response object with tweets and media
      return {
        tweets: parsedResponse.data,
        media: parsedResponse.includes?.media || []
      };
    } catch (error) {
      // Log the error
      await storage.createLog({
        type: 'error',
        message: 'Failed to fetch tweets from Twitter API',
        details: error instanceof Error ? error.message : String(error)
      });
      
      throw error;
    }
  }
  
  // Get tweet URL
  getTweetUrl(username: string, tweetId: string): string {
    return `https://twitter.com/${username}/status/${tweetId}`;
  }
}

// Factory function to create Twitter client
export function createTwitterClient(): TwitterClient | null {
  const apiKey = process.env.TWITTER_API_KEY || '';
  const apiSecret = process.env.TWITTER_API_SECRET || '';
  const bearerToken = process.env.TWITTER_BEARER_TOKEN || '';
  
  if (!apiKey || !apiSecret || !bearerToken) {
    console.error('Twitter API credentials not configured');
    return null;
  }
  
  return new TwitterClient(apiKey, apiSecret, bearerToken);
}
