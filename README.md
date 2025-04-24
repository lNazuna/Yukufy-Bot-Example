# 🎵 Yukufy Music Bot

<p align="center">
  <img src="https://camo.githubusercontent.com/6a6abb059cad96a5748a425c924020fb541dc372d3b9a27bba6dd7a0ca7255a6/68747470733a2f2f69696c692e696f2f3347427143616a2e706e67" alt="Yukufy Bot Logo" width="500">
</p>

A powerful Discord music bot with support for multiple sources (Spotify, SoundCloud, etc), modern visuals with auto-generated cards using [mewcard](https://www.npmjs.com/package/mewcard), and fully slash-command powered. Built with the powerful [yukufy](https://www.npmjs.com/package/yukufy) library for seamless music playback.

## ✨ Features

- 🎶 Play music from Spotify and SoundCloud
- 🔁 Smart queue and voice integration
- 📜 Slash commands (`/play`, `/skip`, etc)
- 📸 Visual music cards with thumbnails and metadata
- 🤖 Fully built with Node.js and Discord.js
- 🔊 Voice channel playback with high-quality audio
- ⚙️ Event-based modular architecture
- 🎧 Advanced music playback using the yukufy library

## 🚀 Installation

Clone the project

```bash
git clone https://github.com/lNazuna/Yukufy-Bot-Example
```

Enter the project directory

```bash
cd yukufy-bot
```

Install dependencies

```bash
npm install
```

Run the bot

```bash
npm run start
```

## 🛠️ Configuration

Create a config.js file in the root directory:

```js
require('dotenv').config();

module.exports = {
  TOKEN: process.env.TOKEN || 'YOUR_DISCORD_BOT_TOKEN',
  GUILD_ID: process.env.GUILD_ID || 'YOUR_GUILD_ID', // Optional If you want the commands to be registered globally, enter the server ID if not leave blank
  MONGODB_URL: process.env.MONGODB_URL || '', // Optional
  OWNER_ID: process.env.OWNER_ID || "207320731263041536",
  LOGS: {
    COMMANDS: process.env.LOGS_COMMANDS || "CHANNEL_ID", // Optional to desativate leave blank
    ERROR: process.env.LOGS_ERROR || "" // Webhook URL
  },
  SPOTIFY: {
    CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || "YOU_SPOTIFY_CLIENT_ID",
    CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || "YOUR_SPOTIFY_CLIENT_SECRE",
    DEFAULT_VOLUME: 75, // Default volume level (0-100)
    LEAVE_ON_EMPTY_QUEUE: true, // Auto-disconnect when queue is empty
    LEAVE_ON_EMPTY_QUEUE_COOLDOWN: 30000 // Wait time before disconnecting (ms)
  },
};
```

Alternatively, you can use environment variables with a `.env` file.

## 📦 Dependencies

- discord.js
- yukufy
- mewcard
- Other optional utilities depending on your structure

Install with:

```bash
npm install discord.js yukufy mewcard
```



## 💬 Available Commands

| Command | Description |
|---------|-------------|
| `/play [query]` | Plays a song by name or link |
| `/skip` | Skips the current song |
| `/stop` | Stops playback and clears the queue |
| `/pause` | Pauses the current song |
| `/resume` | Resumes playback |

## 🖼️ Music Card Preview

When a song starts playing, the bot sends a visual card with:
- Song title
- Artist name
- Thumbnail
- Requested by username

All dynamically generated using mewcard.

## Rules

**Source Code**

    » The bot is open source meaning you can use the bot and modify the code, but it is not allowed to pretend to be the owner/creator of Yukufy Music Bot
    » Any attempt to sell the code of this bot to profit from it, the person who does this will be prosecuted for copyright theft and for profiting from something that is not yours

**Support**

    » All support for Yukufy Music Bot is completely free and only for this bot
    » You will have all the support from our team to help you host the bot on any hosting (replit/heroku etc)
    » You know that our team is not obligated to support if you have violated any of our rules
    » When modifying the bot's source code you may lose support only for the modifications you made

**Terms of Service**

    » You cannot sell the code as it is free to use
    » You cannot financially benefit in any way from Yukufy Music Bot
    » Any attempt to sell or financially benefit from our bot's source code will result in legal action against that person

**Disclaimers**

    » I can change or update any of the terms listed in this list when I deem necessary
    » If you use Yukufy Music Bot Source Code, you automatically accept our terms of service

## 📢 Credits

Discord Bot
- [lNazuna](https://github.com/lNazuna)

Librarie Yukufy:
- [ShindoZk](https://github.com/shindozk)

## Support

For support, join our Discord server: [Yukufy Support Server](https://discord.gg/yukufy) Soon

## 📜 License

This project is licensed under the MIT License. Contributions and forks are welcome!