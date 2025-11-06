import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Form schema
const formSchema = z.object({
  twitterAccount: z.string().min(1, "Twitter account is required"),
  checkInterval: z.coerce.number().int().positive("Check interval must be positive"),
  twitterApiKey: z.string().min(1, "Twitter API key is required"),
  twitterApiSecret: z.string().min(1, "Twitter API secret is required"),
  twitterBearerToken: z.string().min(1, "Twitter bearer token is required"),
  telegramToken: z.string().min(1, "Telegram bot token is required"),
  telegramChannel: z.string().min(1, "Telegram channel ID is required"),
  messageTemplate: z.string().min(1, "Message template is required"),
  includeImages: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface Config {
  id: number;
  twitterAccount: string;
  checkInterval: number;
  twitterApiKey: string;
  twitterApiSecret: string;
  twitterBearerToken: string;
  telegramToken: string;
  telegramChannel: string;
  messageTemplate: string;
  includeImages: boolean;
  serviceActive: boolean;
  lastCheck?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ConfigurationForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showTwitterApiKey, setShowTwitterApiKey] = useState(false);
  const [showTwitterApiSecret, setShowTwitterApiSecret] = useState(false);
  const [showTwitterBearerToken, setShowTwitterBearerToken] = useState(false);
  const [showTelegramToken, setShowTelegramToken] = useState(false);
  
  const { data: config, isLoading } = useQuery<Config>({
    queryKey: ['/api/config'],
  });
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twitterAccount: "",
      checkInterval: 15,
      twitterApiKey: "",
      twitterApiSecret: "",
      twitterBearerToken: "",
      telegramToken: "",
      telegramChannel: "",
      messageTemplate: "",
      includeImages: true,
    },
  });
  
  // Update form values when config data is loaded
  if (config && !form.formState.isDirty) {
    form.reset({
      twitterAccount: config.twitterAccount,
      checkInterval: config.checkInterval,
      twitterApiKey: process.env.TWITTER_API_KEY || config.twitterApiKey,
      twitterApiSecret: process.env.TWITTER_API_SECRET || config.twitterApiSecret,
      twitterBearerToken: process.env.TWITTER_BEARER_TOKEN || config.twitterBearerToken,
      telegramToken: process.env.TELEGRAM_BOT_TOKEN || config.telegramToken,
      telegramChannel: config.telegramChannel,
      messageTemplate: config.messageTemplate,
      includeImages: config.includeImages,
    });
  }
  
  async function onSubmit(values: FormValues) {
    try {
      await apiRequest('POST', '/api/config', values);
      
      // Show success toast
      toast({
        title: "Configuration saved",
        description: "Your changes have been applied successfully.",
      });
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/config'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    } catch (error) {
      console.error("Failed to save configuration:", error);
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      });
    }
  }
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
          <CardDescription><Skeleton className="h-4 w-64" /></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Configuration</CardTitle>
        <CardDescription>Configure your Twitter-to-Telegram service settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="twitterAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Account to Monitor</FormLabel>
                    <div className="flex">
                      <div className="flex-shrink-0 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        @
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="unwomen" 
                          {...field} 
                          className="rounded-l-none"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="checkInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check Interval (minutes)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">API Credentials</h4>
                
                <FormField
                  control={form.control}
                  name="twitterApiKey"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Twitter API Key</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            type={showTwitterApiKey ? "text" : "password"}
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="ml-2"
                          onClick={() => setShowTwitterApiKey(!showTwitterApiKey)}
                        >
                          {showTwitterApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="twitterApiSecret"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Twitter API Secret</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            type={showTwitterApiSecret ? "text" : "password"}
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="ml-2"
                          onClick={() => setShowTwitterApiSecret(!showTwitterApiSecret)}
                        >
                          {showTwitterApiSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="twitterBearerToken"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Twitter Bearer Token</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            type={showTwitterBearerToken ? "text" : "password"}
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="ml-2"
                          onClick={() => setShowTwitterBearerToken(!showTwitterBearerToken)}
                        >
                          {showTwitterBearerToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="telegramToken"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Telegram Bot Token</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            type={showTelegramToken ? "text" : "password"}
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="ml-2"
                          onClick={() => setShowTelegramToken(!showTelegramToken)}
                        >
                          {showTelegramToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="telegramChannel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telegram Channel/Group ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="@channel_name or -1001234567890"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter channel username with @ or numeric ID
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Message Format</h4>
                
                <FormField
                  control={form.control}
                  name="messageTemplate"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Message Template</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Message template"
                          className="font-mono"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Use {"{tweet_text}"} and {"{tweet_url}"} as placeholders
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="includeImages"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Include tweet images</FormLabel>
                        <FormDescription>
                          When enabled, images from tweets will be forwarded to Telegram
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Save Configuration
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
