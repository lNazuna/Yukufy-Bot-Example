
const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const chalk = require('chalk');
const { MONGODB_URL } = require('../../config');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        console.log(chalk.green.bold('INFO: ') + `Bot ${client.user.tag} is ready and connected to Discord!`);

        if (!MONGODB_URL) {
            console.log(chalk.yellow.bold('INFO: ') + 'MongoDB URL is not provided or is set to the default placeholder. Skipping MongoDB connection.');
        } else {
            try {
                await mongoose.connect(MONGODB_URL);
                if (mongoose.connect) {
                    console.log(chalk.green.bold('SUCCESS: ') + 'Connected to MongoDB successfully!');
                }
            } catch (error) {
                console.log(chalk.red.bold('ERROR: ') + 'Failed to connect to MongoDB. Please check your MongoDB URL and connection.');
                console.error(error);    
            }
        }

        client.user.setPresence({
            activities: [{
                type: ActivityType.Custom,
                name: "custom",
                state: "🚀 Yukufy!"
            }]
        })

    },
  };