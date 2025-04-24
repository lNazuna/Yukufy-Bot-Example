const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('This is the ping command.'),
        cooldown: 10,

    async execute(interaction, client) {
        const circles = {
            good: '<:High:1341748727836315658>',
            okay: '<:Mid:1341748741920784444>', 
            bad: '<:Low:1341748750850330725>',
        };
 
        await interaction.deferReply();
 
        const pinging = await interaction.editReply({ 
            content: 'Pinging...'
        });
 
        const ws = client.ws.ping;
        const msgEdit = Date.now() - pinging.createdTimestamp;

        let dbPing = null;
        if (mongoose.connection.readyState === 1) {
            const dbPingStart = Date.now();
            await mongoose.connection.db.admin().ping();
            dbPing = Date.now() - dbPingStart;
        }
 
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
 
        const wsEmoji = ws <= 100 ? circles.good : ws <= 200 ? circles.okay : circles.bad;
        const msgEmoji = msgEdit <= 200 ? circles.good : circles.bad;
        const dbEmoji = dbPing ? (dbPing <= 100 ? circles.good : dbPing <= 200 ? circles.okay : circles.bad) : '❓';
 
        const pingEmbed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL({ size: 64 }))
            .setColor("Blue")
            .setTimestamp()
            .setFooter({ text: 'Pinged At'})
            .addFields(
                {
                    name: 'Websocket Latency',
                    value: `${wsEmoji} \`${ws}ms\``,
                },
                {
                    name: 'API Latency',
                    value: `${msgEmoji} \`${msgEdit}ms\``,
                },
                {
                    name: 'Database Latency',
                    value: `${dbEmoji} \`${dbPing ? dbPing + 'ms' : 'Not Connected'}\``,
                },
                {
                    name: `${interaction.client.user.username} Uptime`,
                    value: `<:Timer:1341748761977683978> \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``,
                }
            );
 
        await pinging.edit({ embeds: [pingEmbed], content: '\u200b' });
    }
};