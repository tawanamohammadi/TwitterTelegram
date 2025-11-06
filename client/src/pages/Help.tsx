import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Help() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Learn how to set up and use the UNFEM Twitter to Telegram service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">What is this service?</h3>
            <p className="text-gray-600">
              This service automatically monitors the UN Women (UNFEM) Twitter/X account for new tweets and forwards them to a Telegram channel or group of your choice.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Setup Instructions</h3>
            <ol className="list-decimal ml-5 space-y-2 text-gray-600">
              <li>
                <strong>Twitter/X API Credentials:</strong> You need to create a Twitter Developer account and generate API credentials. Go to the 
                <a href="https://developer.twitter.com/en/portal/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary font-medium"> Twitter Developer Portal </a> 
                to get started.
              </li>
              <li>
                <strong>Telegram Bot:</strong> Create a Telegram bot using 
                <a href="https://telegram.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-primary font-medium"> BotFather </a> 
                and get your bot token. Add the bot to your channel or group as an admin.
              </li>
              <li>
                <strong>Channel ID:</strong> For public channels, use the username with @ (e.g., @mychannel). For private channels or groups, you need the numerical ID.
              </li>
              <li>
                <strong>Configure Service:</strong> Enter all the credentials in the Configuration page and save.
              </li>
              <li>
                <strong>Test Connection:</strong> Use the "Send Test Message" button to verify your setup.
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
          <CardDescription>
            Common issues and how to resolve them
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Twitter API Errors</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>
                <strong>401 Unauthorized:</strong> Check that your API keys are correct. Twitter may have revoked access.
              </li>
              <li>
                <strong>429 Too Many Requests:</strong> You've hit a rate limit. Try increasing the check interval.
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Telegram Errors</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>
                <strong>Bot token not valid:</strong> Double-check your bot token with BotFather.
              </li>
              <li>
                <strong>Chat not found:</strong> Ensure the bot is a member of the channel/group and has permission to post messages.
              </li>
              <li>
                <strong>Bot is not an admin:</strong> For channels, the bot must be added as an administrator.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">How often does the service check for new tweets?</h3>
            <p className="text-gray-600">
              You can configure the check interval in the Configuration page. The default is every 15 minutes.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Does it forward all tweets or just new ones?</h3>
            <p className="text-gray-600">
              The service tracks which tweets it has already processed and only forwards new ones.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Can I monitor multiple Twitter accounts?</h3>
            <p className="text-gray-600">
              Currently, the service is designed to monitor a single Twitter account at a time. You can change which account to monitor in the Configuration page.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">How do I customize the message format?</h3>
            <p className="text-gray-600">
              Edit the message template in the Configuration page. You can use {"{tweet_text}"} and {"{tweet_url}"} as placeholders.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
