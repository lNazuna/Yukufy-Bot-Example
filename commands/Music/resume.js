const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the paused song'),
    async execute(interaction) {
        try {
            const yukufy = interaction.client.yukufy || global.yukufy;
            if (!yukufy) {
                const errorEmbed = new EmbedBuilder()
                    .setTitle('❌ Error')
                    .setDescription('Music system not available!')
                    .setColor('#FF0000')
                    .setTimestamp()
                    .setFooter({ text: `Requested by ${interaction.user.username}` });

                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            }

            const guildId = interaction.guildId;
            const result = await yukufy.resume(guildId);

            if (result.status === 'alreadyPlaying') {
                const alreadyPlayingEmbed = new EmbedBuilder()
                    .setTitle('▶️ Already Playing')
                    .setDescription('The music is already playing.')
                    .setColor('#FFA500')
                    .setTimestamp()
                    .setFooter({ text: `Requested by ${interaction.user.username}` });

                await interaction.reply({ embeds: [alreadyPlayingEmbed] });
            } else {
                const resumedEmbed = new EmbedBuilder()
                    .setTitle('▶️ Music Resumed')
                    .setDescription('The playback has been resumed.')
                    .setColor('#8A2BE2')
                    .setTimestamp()
                    .setFooter({ text: `Requested by ${interaction.user.username}` });

                await interaction.reply({ embeds: [resumedEmbed] });
            }
        } catch (error) {
            console.error('Resume command error:', error);
            
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Error')
                .setDescription(`Could not resume: ${error.message}`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.username}` });

            await interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true
            });
        }
    }
};