const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'trackEnd',
    async execute({track, queue}) {
        console.log(`[Yukufy] Track ended: ${track.title} - ${track.artist} (${track.guildId})`);

        const textChannel = track.textChannel;
        if (track.startMessageId && textChannel) {
            //console.log(track.startMessageId)
            try {
                const message = await textChannel.messages.fetch(track.startMessageId);
                await message.delete();
                console.log(`[Yukufy] Deleted message for track: ${track.title}`);
            } catch (error) {
                console.error(`[Yukufy] Failed to delete message for track: ${track.title}`, error);
            }
        }

        const embed = new EmbedBuilder()
            .setTitle('⏹️ Track Ended')
            .setDescription(`**${track.title}**\nArtist: ${track.artist}`)
            .setColor('#FFA500')
            .setThumbnail(track.thumbnail)
            .addFields(
                { name: 'Duration', value: track.duration, inline: true },
                { name: 'Played by', value: `<@${track.member.id}>`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Requested by ${track.member.user.username}>` });

        textChannel.send({ embeds: [embed] });
    }
};