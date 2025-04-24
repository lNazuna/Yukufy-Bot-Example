const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'disconnect',
    async execute({queue}) {
        console.log(`[Yukufy] Disconnected from the channel (${queue.guildId})`);
    }
};