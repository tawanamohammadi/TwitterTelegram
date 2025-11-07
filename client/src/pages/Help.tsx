
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Globe, Mail, Phone } from "lucide-react";

export default function Help() {
  return (
    <div className="space-y-8">
      {/* Developer Info Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            About the Developer
          </CardTitle>
          <CardDescription>
            Built by Tawana Mohammadi - AI Researcher & Data Strategist
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700">
              <strong>Tawana Mohammadi (توانا محمدی)</strong> is an AI researcher, data strategist, and educator specializing in 
              AI ethics, data transparency, and human-centered technology. With over 10 years of experience in building ethical AI systems, 
              Tawana is committed to creating transparent and responsible technology solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900">Academic Affiliations</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>🎓 University of the People (B.Sc. Computer Science, AI)</li>
                <li>🏛️ Harvard University (Research Collaborator)</li>
                <li>🌐 Tawana Network (Founder)</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900">Research Focus</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>🤖 AI Ethics & Governance</li>
                <li>📊 Data Transparency</li>
                <li>🔒 Digital Rights & Cybersecurity</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <a 
              href="https://tawana.online" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Globe className="h-4 w-4" />
              tawana.online
              <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href="https://github.com/tawanamohammadi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Github className="h-4 w-4" />
              @tawanamohammadi
              <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href="mailto:info@tawana.online"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              info@tawana.online
            </a>
            <a 
              href="tel:+989901120235"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Phone className="h-4 w-4" />
              +98 990 112 0235
            </a>
          </div>

          <div className="flex flex-wrap gap-2 pt-3">
            <a 
              href="https://orcid.org/0009-0005-6825-6728" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200"
            >
              ORCID: 0009-0005-6825-6728
            </a>
            <a 
              href="https://scholar.google.com/citations?user=VP8O0a4AAAAJ&hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
            >
              Google Scholar
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Learn how to set up and use the TwitterTelegram service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">What is this service?</h3>
            <p className="text-gray-600">
              TwitterTelegram is an enterprise-grade web application that automatically monitors Twitter/X accounts 
              and forwards new tweets to Telegram channels or groups in real-time. It features a beautiful, responsive 
              dashboard for complete control and monitoring.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Setup Instructions</h3>
            <ol className="list-decimal ml-5 space-y-2 text-gray-600">
              <li>
                <strong>Twitter/X API Credentials:</strong> Create a Twitter Developer account and generate API credentials. 
                Go to the <a href="https://developer.twitter.com/en/portal/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                  Twitter Developer Portal <ExternalLink className="inline h-3 w-3" />
                </a> to get started.
              </li>
              <li>
                <strong>Telegram Bot:</strong> Create a Telegram bot using <a href="https://telegram.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                  BotFather <ExternalLink className="inline h-3 w-3" />
                </a> and get your bot token. Add the bot to your channel or group as an admin.
              </li>
              <li>
                <strong>Channel ID:</strong> For public channels, use the username with @ (e.g., @mychannel). 
                For private channels or groups, you need the numerical ID (starts with -100).
              </li>
              <li>
                <strong>Configure Service:</strong> Navigate to the Configuration page, enter all the credentials, 
                customize your message template, and save.
              </li>
              <li>
                <strong>Test Connection:</strong> Use the "Send Test Message" button in the Dashboard to verify your setup.
              </li>
              <li>
                <strong>Start Service:</strong> Toggle the service on from the Dashboard and monitor the activity logs.
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Features Overview</CardTitle>
          <CardDescription>
            Explore the powerful features of TwitterTelegram
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">🐦 Twitter Integration</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time tweet monitoring</li>
                <li>• Support for images and media</li>
                <li>• Configurable check intervals</li>
                <li>• Duplicate detection</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">📱 Telegram Integration</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Formatted message delivery</li>
                <li>• Photo/image support</li>
                <li>• Customizable templates</li>
                <li>• Test message functionality</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">🎨 Modern Dashboard</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time status monitoring</li>
                <li>• Live activity logs</li>
                <li>• Interactive statistics</li>
                <li>• Responsive design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">⚙️ Configuration</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Web-based setup</li>
                <li>• Secure credential storage</li>
                <li>• Message template editor</li>
                <li>• Image forwarding toggle</li>
              </ul>
            </div>
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
                Try regenerating your credentials from the Developer Portal.
              </li>
              <li>
                <strong>429 Too Many Requests:</strong> You've hit a rate limit. Increase the check interval in 
                Configuration to reduce API calls.
              </li>
              <li>
                <strong>403 Forbidden:</strong> Your app may not have the required permissions. Check your Twitter 
                app settings and ensure you have "Read" permissions.
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Telegram Errors</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>
                <strong>Bot token not valid:</strong> Double-check your bot token with BotFather. 
                Ensure there are no extra spaces or characters.
              </li>
              <li>
                <strong>Chat not found:</strong> Ensure the bot is a member of the channel/group and has 
                permission to post messages. For channels, verify the bot is an administrator.
              </li>
              <li>
                <strong>Forbidden: bot is not an admin:</strong> For channels, the bot must be added as an 
                administrator with posting permissions.
              </li>
              <li>
                <strong>Invalid chat_id:</strong> Verify your channel ID format. Public channels use @username, 
                private channels need numeric ID (e.g., -1001234567890).
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Service Issues</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>
                <strong>Service won't start:</strong> Check the Activity Logs for specific error messages. 
                Ensure all required credentials are configured in the Configuration page.
              </li>
              <li>
                <strong>No tweets being forwarded:</strong> Verify the Twitter account is public and has recent tweets. 
                Use "Check Now" to test manually.
              </li>
              <li>
                <strong>Database connection failed:</strong> If using PostgreSQL, verify your DATABASE_URL. 
                The app will fall back to in-memory storage if the database is unavailable.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">How often does the service check for new tweets?</h3>
            <p className="text-gray-600">
              You can configure the check interval in the Configuration page. Available options are 5, 15, 30, 
              or 60 minutes. The default is 15 minutes to balance between timeliness and API rate limits.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Does it forward all tweets or just new ones?</h3>
            <p className="text-gray-600">
              The service tracks which tweets it has already processed in the database and only forwards new ones. 
              This prevents duplicate messages to your Telegram channel.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Can I monitor multiple Twitter accounts?</h3>
            <p className="text-gray-600">
              Currently, the service is designed to monitor a single Twitter account at a time. You can change 
              which account to monitor in the Configuration page. Multi-account support is planned for future versions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">How do I customize the message format?</h3>
            <p className="text-gray-600">
              Edit the message template in the Configuration page. You can use <code>{"{tweet_text}"}</code> and{" "}
              <code>{"{tweet_url}"}</code> as placeholders. Markdown formatting is supported for styling.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Is my data secure?</h3>
            <p className="text-gray-600">
              Yes! All API credentials are stored securely and never exposed in the frontend. When using environment 
              variables, sensitive data never touches the database. The application is designed with security best 
              practices including input validation and SQL injection prevention.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Can I deploy this on my own server?</h3>
            <p className="text-gray-600">
              Absolutely! This is an open-source project. You can deploy it on any Node.js hosting platform. 
              The repository includes detailed deployment instructions for Replit and other platforms.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Repository and Support Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Repository & Support</CardTitle>
          <CardDescription>
            Access the source code and get help
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-semibold">GitHub Repository</h4>
              <p className="text-sm text-gray-600">View source code, report issues, and contribute</p>
            </div>
            <a 
              href="https://github.com/tawanamohammadi/TwitterTelegram" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Github className="h-4 w-4" />
              View on GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Need Help?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check the Activity Logs in the Dashboard for detailed error messages</li>
              <li>• Open an issue on <a href="https://github.com/tawanamohammadi/TwitterTelegram/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub Issues</a></li>
              <li>• Contact the developer: <a href="mailto:info@tawana.online" className="text-primary hover:underline">info@tawana.online</a></li>
              <li>• Star the repository if you find it useful!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
