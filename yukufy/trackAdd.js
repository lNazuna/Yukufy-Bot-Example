const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'trackAdd',
    async execute({queue, track}) {
        //console.log(track.queue.length);
        console.log(`[Yukufy] Track added: ${track.title} - ${track.artist} (${track.guildId})`);

        console.log(queue.length);
        // If track was auto-added, don't send notification
        if (track.autoAdded) return;

        const textChannel = track.textChannel;
        if (textChannel && queue.length > 1) {
            const embed = new EmbedBuilder()
                .setTitle('➕ Added to Queue')
                .setDescription(`**${track.title}**\nArtist: ${track.artist}`)
                .setColor('#4CAF50')
                .setThumbnail(track.thumbnail)
                .addFields(
                    { name: 'Position', value: `${queue.length}`, inline: true },
                    { name: 'Duration', value: track.duration, inline: true },
                    { name: 'Added by', value: `<@${track.member.id}>`, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: `Requested by ${track.member.user.username}` });

            textChannel.send({ embeds: [embed] });
        }
    }
};