
# 🌐 TwitterTelegram - Professional Twitter to Telegram Bridge

<div align="center">

![TwitterTelegram Logo](https://img.shields.io/badge/Twitter-Telegram-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

**A powerful, enterprise-grade service for automatically forwarding tweets to Telegram channels**

*Built with modern tech stack • Full-featured dashboard • Production-ready deployment*

[Features](#-features) •
[Demo](#-demo) •
[Installation](#-installation) •
[Documentation](#-documentation) •
[API Reference](#-api-reference) •
[Contributing](#-contributing)

</div>

---

## 👨‍💻 About the Developer

<div align="center">

### **Tawana Mohammadi | توانا محمدی**

[![ORCID](https://img.shields.io/badge/ORCID-0009--0005--6825--6728-A6CE39?style=flat-square&logo=orcid&logoColor=white)](https://orcid.org/0009-0005-6825-6728)
[![Google Scholar](https://img.shields.io/badge/Google%20Scholar-VP8O0a4AAAAJ-4285F4?style=flat-square&logo=google-scholar&logoColor=white)](https://scholar.google.com/citations?user=VP8O0a4AAAAJ&hl=en)
[![Website](https://img.shields.io/badge/Website-tawana.online-00ADD8?style=flat-square&logo=google-chrome&logoColor=white)](https://tawana.online)
[![GitHub](https://img.shields.io/badge/GitHub-tawanamohammadi-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/tawanamohammadi)

**AI Researcher • Data Strategist • Educator**

🎓 University of the People (B.Sc. Computer Science, AI Track)  
🏛️ Harvard University (Research Collaborator)  
🌐 Tawana Network (Founder - Ethical AI Research Hub)

*Specialized in AI Ethics, Data Transparency, and Human-Centered Technology*

📧 [info@tawana.online](mailto:info@tawana.online) | 📱 +98 990 112 0235

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**TwitterTelegram** is an enterprise-grade, full-stack web application that automatically monitors Twitter/X accounts and forwards new tweets to Telegram channels or groups in real-time. Built with modern technologies and best practices, it features a beautiful, responsive dashboard for complete control and monitoring.

### 🌟 Why TwitterTelegram?

- ✅ **Zero Manual Work**: Fully automated tweet monitoring and forwarding
- ✅ **Enterprise Ready**: Production-grade architecture with error handling
- ✅ **Beautiful Dashboard**: Modern React UI with real-time updates
- ✅ **Highly Configurable**: Customize every aspect via web interface
- ✅ **Privacy Focused**: Self-hosted solution with full data control
- ✅ **Open Source**: MIT licensed, free to use and modify

---

## ✨ Features

### Core Functionality

🐦 **Twitter Integration**
- Real-time tweet monitoring using Twitter API v2
- Support for text tweets with images
- Configurable check intervals (5, 15, 30, 60 minutes)
- Duplicate detection to prevent re-posting
- Rate limit handling and error recovery

📱 **Telegram Integration**
- Send formatted messages to channels/groups
- Support for text and photo messages
- Markdown formatting support
- Customizable message templates
- Test message functionality

🎨 **Modern Dashboard**
- Real-time service status monitoring
- Live activity logs with filtering
- Interactive statistics and charts
- Manual control buttons (Check Now, Test Message)
- Service start/stop toggle
- Responsive design for all devices

⚙️ **Advanced Configuration**
- Web-based configuration panel
- Secure credential management
- Message template customization
- Image forwarding toggle
- Interval scheduling
- All settings persist in database

📊 **Monitoring & Analytics**
- Total tweets forwarded counter
- Service uptime tracking
- Last check timestamp
- Detailed activity logs
- Error tracking and reporting
- Success/failure rate statistics

### Technical Features

🔒 **Security**
- Environment variable support
- Password-protected API credentials in UI
- Input validation with Zod schemas
- SQL injection prevention
- CORS configuration
- Rate limiting ready

💾 **Database**
- PostgreSQL support (production)
- In-memory storage fallback (development)
- Drizzle ORM for type-safe queries
- Automatic schema migrations
- Transaction support

🚀 **Performance**
- Server-side rendering
- Optimized API endpoints
- Efficient cron scheduling
- React Query for data caching
- Lazy loading components
- Production build optimization

---

## 🎬 Demo

### Dashboard Screenshots

<div align="center">

#### Main Dashboard
*Monitor service status, view statistics, and control the service*

#### Configuration Panel
*Easy-to-use interface for all settings*

#### Activity Logs
*Real-time timeline of all service activities*

</div>

### Live Demo

> 🚀 **Try it live**: [Demo Link](#) *(Coming soon)*

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Drizzle ORM
- **Validation**: Zod
- **Scheduling**: node-cron
- **HTTP Client**: Fetch API

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

### APIs
- **Twitter**: Twitter API v2 (Official)
- **Telegram**: Telegram Bot API (Official)

### DevOps
- **Database**: PostgreSQL / In-Memory
- **Deployment**: Replit Deployments
- **Version Control**: Git/GitHub

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (React + Vite)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │Configuration │  │   Logs Page  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │ REST API
┌────────────────────────────┴────────────────────────────────┐
│              Server (Express + TypeScript)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Routes     │  │  Scheduler   │  │   Storage    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────┬──────────────────┬──────────────────┬─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
    ┌──────────┐      ┌──────────┐      ┌──────────┐
    │ Twitter  │      │ Telegram │      │PostgreSQL│
    │   API    │      │   API    │      │    DB    │
    └──────────┘      └──────────┘      └──────────┘
```

### Data Flow

1. **Scheduler** runs on configured intervals (node-cron)
2. Fetches latest tweets from **Twitter API**
3. Checks against database for duplicates
4. Formats message using template
5. Sends to **Telegram** via Bot API
6. Logs activity and updates statistics
7. Frontend queries API and displays real-time updates

---

## 📥 Installation

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- PostgreSQL database (optional, has in-memory fallback)
- Twitter Developer Account ([Get one here](https://developer.twitter.com/))
- Telegram Bot Token ([Get from BotFather](https://t.me/botfather))

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/tawanamohammadi/TwitterTelegram.git
cd TwitterTelegram
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Twitter API Credentials (Required)
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_BEARER_TOKEN=your_twitter_bearer_token

# Telegram Bot Configuration (Required)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL=@your_channel_or_chat_id

# Database (Optional - uses in-memory if not provided)
DATABASE_URL=postgresql://user:password@host:port/database

# Server Configuration (Optional)
PORT=5000
NODE_ENV=development
```

4. **Initialize database** (if using PostgreSQL)
```bash
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:5000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## ⚙️ Configuration

### Getting Twitter API Credentials

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new project and app
3. Navigate to "Keys and tokens" section
4. Generate and copy:
   - API Key
   - API Secret Key
   - Bearer Token

### Creating a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the prompts to create your bot
4. Copy the bot token provided
5. Add your bot to the target channel/group
6. Make the bot an administrator (for channels)

### Getting Telegram Channel ID

**For Public Channels:**
```
Use: @channel_username
```

**For Private Channels/Groups:**
1. Add [@userinfobot](https://t.me/userinfobot) to your channel
2. Copy the channel ID (starts with `-100`)

### Dashboard Configuration

After starting the application:

1. Navigate to **Configuration** page
2. Enter your Twitter account username (without @)
3. Set check interval (5, 15, 30, or 60 minutes)
4. Input Twitter API credentials
5. Input Telegram bot token and channel ID
6. Customize message template using placeholders:
   - `{tweet_text}` - The tweet content
   - `{tweet_url}` - Link to the tweet
7. Toggle image forwarding on/off
8. Click "Save Configuration"

### Message Template Examples

**Simple format:**
```
{tweet_text}

{tweet_url}
```

**Professional format:**
```
📢 *New Tweet from UN Women*

{tweet_text}

🔗 [View on Twitter]({tweet_url})
```

**Minimal format:**
```
{tweet_text}
```

---

## 🚀 Usage

### Starting the Service

1. Navigate to the **Dashboard**
2. Ensure configuration is complete
3. Click the **"Start Service"** toggle
4. Monitor the status indicator (should show "Active")

### Manual Actions

**Check Now** - Immediately check for new tweets
```
Dashboard → Manual Actions → Check Now
```

**Send Test Message** - Verify Telegram configuration
```
Dashboard → Manual Actions → Send Test Message
```

**Reset Statistics** - Clear all statistics (keeps tweets history)
```
Dashboard → Manual Actions → Reset Stats
```

### Monitoring

**View Statistics:**
- Total tweets forwarded
- Service uptime
- Last check time
- Service status

**Activity Logs:**
- Real-time activity feed
- Filterable by type (info, success, error, warning)
- Detailed error messages
- Timestamp for each entry

### API Endpoints

All endpoints are prefixed with `/api`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/config` | Get current configuration |
| PATCH | `/config` | Update configuration |
| GET | `/stats` | Get service statistics |
| GET | `/logs` | Get activity logs |
| POST | `/check-now` | Trigger immediate check |
| POST | `/test-telegram` | Send test message |
| POST | `/reset` | Reset statistics |

---

## 📚 API Documentation

### Configuration API

#### Get Configuration
```http
GET /api/config
```

**Response:**
```json
{
  "id": 1,
  "twitterAccount": "unwomen",
  "checkInterval": 15,
  "twitterApiKey": "***",
  "twitterApiSecret": "***",
  "twitterBearerToken": "***",
  "telegramToken": "***",
  "telegramChannel": "@channel",
  "messageTemplate": "{tweet_text}\n\n{tweet_url}",
  "includeImages": true,
  "serviceActive": true,
  "lastCheck": "2025-01-07T12:00:00Z"
}
```

#### Update Configuration
```http
PATCH /api/config
Content-Type: application/json

{
  "twitterAccount": "unwomen",
  "checkInterval": 15,
  "twitterApiKey": "your_key",
  "twitterApiSecret": "your_secret",
  "twitterBearerToken": "your_token",
  "telegramToken": "your_bot_token",
  "telegramChannel": "@your_channel",
  "messageTemplate": "{tweet_text}\n\n{tweet_url}",
  "includeImages": true
}
```

### Statistics API

#### Get Statistics
```http
GET /api/stats
```

**Response:**
```json
{
  "id": 1,
  "tweetsForwarded": 42,
  "serviceStartTime": "2025-01-07T10:00:00Z",
  "lastReset": "2025-01-07T10:00:00Z"
}
```

### Logs API

#### Get Logs
```http
GET /api/logs?limit=50
```

**Response:**
```json
[
  {
    "id": 1,
    "type": "success",
    "message": "Tweet forwarded successfully",
    "details": "Tweet ID: 1234567890",
    "timestamp": "2025-01-07T12:00:00Z"
  }
]
```

### Action APIs

#### Check Now
```http
POST /api/check-now
```

#### Test Telegram
```http
POST /api/test-telegram
```

#### Reset Stats
```http
POST /api/reset
```

---

## 🌐 Deployment

### Deploy on Replit

This application is optimized for Replit deployment:

1. **Import to Replit**
   - Go to [Replit](https://replit.com)
   - Click "Create Repl"
   - Select "Import from GitHub"
   - Enter: `https://github.com/tawanamohammadi/TwitterTelegram`

2. **Configure Secrets**
   - Open the "Secrets" tool (lock icon)
   - Add your environment variables:
     - `TWITTER_API_KEY`
     - `TWITTER_API_SECRET`
     - `TWITTER_BEARER_TOKEN`
     - `TELEGRAM_BOT_TOKEN`
     - `TELEGRAM_CHANNEL`
     - `DATABASE_URL` (optional)

3. **Deploy**
   - Click the "Deploy" button
   - Choose your deployment tier
   - Configure build/run commands (auto-detected)
   - Click "Deploy"

4. **Access Your App**
   - Your app will be available at `https://your-repl-name.repl.co`

### Environment Variables for Production

Required environment variables:
```env
TWITTER_API_KEY=xxx
TWITTER_API_SECRET=xxx
TWITTER_BEARER_TOKEN=xxx
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHANNEL=xxx
DATABASE_URL=postgresql://... (recommended for production)
```

---

## 🔒 Security

### Best Practices

✅ **Never commit `.env` file** - It's in `.gitignore` by default
✅ **Use environment variables** - For all sensitive data
✅ **Rotate credentials regularly** - Change API keys periodically
✅ **Use strong database passwords** - If using PostgreSQL
✅ **Enable HTTPS** - In production (automatic on Replit)
✅ **Validate all inputs** - Using Zod schemas (implemented)
✅ **Rate limiting** - Consider adding for public deployments

### Security Features

- Input validation with Zod
- SQL injection prevention via ORM
- Password-protected credentials in UI
- Environment variable support
- Type-safe API with TypeScript

---

## 🐛 Troubleshooting

### Common Issues

#### Twitter API Errors

**401 Unauthorized**
- Verify your API credentials are correct
- Check if your Twitter Developer account is active
- Regenerate tokens if necessary

**429 Rate Limit**
- Increase check interval in configuration
- Twitter has rate limits for API calls
- Consider upgrading your Twitter API tier

#### Telegram Errors

**Bot token invalid**
- Verify token with BotFather
- Check for extra spaces in the token
- Regenerate token if needed

**Chat not found**
- Ensure bot is added to channel/group
- Verify bot is an administrator (for channels)
- Check channel ID format (@username or -100xxx)

**Forbidden: bot is not a member**
- Add bot to the channel/group
- Make bot an administrator

#### Service Not Starting

1. Check Dashboard for error messages
2. Review Activity Logs for details
3. Verify all credentials are configured
4. Try "Check Now" to test manually
5. Check console logs in Replit

#### Database Connection Issues

- Verify DATABASE_URL is correct
- Check database server is running
- Ensure database exists
- Application falls back to in-memory if DB fails

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repository

### Development Setup

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Test thoroughly
5. Commit your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. Push to your fork
   ```bash
   git push origin feature/amazing-feature
   ```
7. Open a Pull Request

### Code Style

- Follow existing TypeScript/React patterns
- Use meaningful variable names
- Add comments for complex logic
- Update documentation for new features
- Ensure all tests pass

---

## 🗺 Roadmap

### Planned Features

- [ ] Multi-account support (monitor multiple Twitter accounts)
- [ ] Advanced tweet filtering (by keywords, hashtags)
- [ ] Scheduled posting (delay forwarding)
- [ ] Multiple Telegram destinations
- [ ] User authentication system
- [ ] Team collaboration features
- [ ] Analytics dashboard with charts
- [ ] Webhook support
- [ ] Custom notification rules
- [ ] API rate limit monitoring
- [ ] Automatic retry on failures
- [ ] Tweet translation support
- [ ] Media optimization for Telegram
- [ ] Backup/restore configuration
- [ ] Mobile app (React Native)

### Version History

**v1.0.0** (Current)
- Initial release
- Twitter to Telegram forwarding
- Web dashboard
- Configuration management
- Activity logging
- Statistics tracking

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Tawana Mohammadi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

### Technologies & Libraries

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [Zod](https://zod.dev/) - Schema validation

### Inspiration

This project was created to solve the real-world need of automatically sharing important updates from social media platforms to private or organizational communication channels.

---

## 📞 Support & Contact

### Developer Contact

**Tawana Mohammadi | توانا محمدی**

- 🌐 Website: [tawana.online](https://tawana.online)
- 📧 Email: [info@tawana.online](mailto:info@tawana.online)
- 📱 Phone: +98 990 112 0235
- 🐙 GitHub: [@tawanamohammadi](https://github.com/tawanamohammadi)
- 📚 Medium: [@tawanamohammadi](https://tawanamohammadi.medium.com/)
- 🎓 ORCID: [0009-0005-6825-6728](https://orcid.org/0009-0005-6825-6728)
- 📖 Google Scholar: [VP8O0a4AAAAJ](https://scholar.google.com/citations?user=VP8O0a4AAAAJ&hl=en)

### Get Help

- 📖 Read the [Documentation](#-documentation)
- 🐛 Report issues on [GitHub Issues](https://github.com/tawanamohammadi/TwitterTelegram/issues)
- 💬 Ask questions in [Discussions](https://github.com/tawanamohammadi/TwitterTelegram/discussions)
- ⭐ Star the repo if you find it useful!

---

## 🌟 Show Your Support

If you find this project useful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 🔀 Forking and contributing
- 📢 Sharing with others

---

<div align="center">

### Built with ❤️ by Tawana Mohammadi

**AI Researcher • Data Strategist • Educator**

*Designing human-centered, transparent, and responsible AI systems*

[![GitHub](https://img.shields.io/github/followers/tawanamohammadi?label=Follow&style=social)](https://github.com/tawanamohammadi)
[![Twitter](https://img.shields.io/badge/Twitter-@tawanamohammadi-1DA1F2?style=flat-square&logo=twitter&logoColor=white)](https://twitter.com/tawanamohammadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/tawanamohammadi)

---

**© 2025 Tawana Mohammadi. All rights reserved.**

*Building transparent, ethical, and educational AI systems*

[Website](https://tawana.online) • [GitHub](https://github.com/tawanamohammadi) • [Email](mailto:info@tawana.online)

</div>
