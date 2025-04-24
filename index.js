require('dotenv').config();
const { SPOTIFY } = require('./config');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { Client, Collection, GatewayIntentBits, Partials, REST, Routes } = require('discord.js');
const { TOKEN, GUILD_ID } = require('./config');
const { antiCrash } = require('./functions/antiCrash');
const { loadYukufy } = require('./functions/loadYukufy');
const { YukufyClient } = require('yukufy');
antiCrash();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember
  ]
});

// Create Yukufy client
const yukufy = new YukufyClient(client, {
  api: {
    clientId: SPOTIFY.CLIENT_ID,
    clientSecret: SPOTIFY.CLIENT_SECRET,
  },
  player: {
    defaultVolume: SPOTIFY.DEFAULT_VOLUME,
    leaveOnEmptyQueue: SPOTIFY.LEAVE_ON_EMPTY_QUEUE,
    leaveOnEmptyQueueCooldown: SPOTIFY.LEAVE_ON_EMPTY_QUEUE_COOLDOWN
  }
});

global.yukufy = yukufy;
client.yukufy = yukufy;
loadYukufy(client);

client.commands = new Collection();
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

const log = (message, type = 'INFO') => {
    const colors = {
        INFO: chalk.blue.bold('INFO:'),
        SUCCESS: chalk.green.bold('SUCCESS:'),
        ERROR: chalk.red.bold('ERROR:'),
        WARNING: chalk.yellow.bold('WARNING:')
    };
    console.log(colors[type] + ' ' + message);
};

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);
    if (!command.data || !command.data.name || typeof command.data.name !== 'string') {
        log(`The command file "$index.js" is missing a valid name property.`, 'ERROR');
        return null;
    }
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFolders = fs.readdirSync(eventsPath);

for (const folder of eventFolders) {
  const folderPath = path.join(eventsPath, folder);
  const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    const filePath = path.join(folderPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
    console.log(chalk.green.bold('SUCCESS: ') + `Loaded event: ${chalk.cyan.bold(event.name)} from ${chalk.yellow(file)}`);
  }
}

// Load schemas
const schemasPath = path.join(__dirname, 'schemas');
const schemaFiles = fs.readdirSync(schemasPath).filter(file => file.endsWith('.js'));
for (const file of schemaFiles) {
  const filePath = path.join(schemasPath, file);
  require(filePath);
  console.log(chalk.green.bold('SUCCESS: ') + `Loaded schema from ${chalk.yellow(file)}`);
}

client.once('ready', async () => {
  console.log(chalk.green.bold('SUCCESS: ') + `Bot ${client.user.tag} logged in successfully!`);

  const CLIENT_ID = client.user.id;
  const rest = new REST({ version: '10' }).setToken(TOKEN);

  if (GUILD_ID) {
    // Single guild
    const guildId = GUILD_ID;
    try {
      const guild = await client.guilds.fetch(guildId);
      console.log(chalk.green.bold('SUCCESS: ') + `Registering commands for guild ${guild.name} (${guildId})`);
      await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, guildId),
        { body: commands }
      );
      console.log(chalk.green.bold('SUCCESS: ') + 'Successfully registered application commands for single guild.');
    } catch (error) {
      console.error(error);
    }
  } else {
    // Global commands
    try {
      console.log(chalk.green.bold('SUCCESS: ') + 'Registering global commands');
      await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: commands }
      );
      console.log(chalk.green.bold('SUCCESS: ') + 'Successfully registered global application commands.');
    } catch (error) {
      console.error(error);
    }
  }
});

client.login(TOKEN);