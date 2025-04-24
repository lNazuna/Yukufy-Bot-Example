const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'trackError',
    async execute({track, error}) {
        console.error(`[Yukufy] Playback error: ${track.title} - ${error.message} (${track.guildId})`);

        const textChannel = track.textChannel;
        if (textChannel) {
            const embed = new EmbedBuilder()
                .setTitle('❌ Playback Error')
                .setDescription(`Failed to play **${track.title}**.\nSkipping to the next track.`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({ text: `Requested by ${track.member.user.username}` });

            textChannel.send({ embeds: [embed] });
        }
    }
};