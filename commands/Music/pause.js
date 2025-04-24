const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the current song'),
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
            const result = await yukufy.pause(guildId);

            if (result.status === 'alreadyPaused') {
                const alreadyPausedEmbed = new EmbedBuilder()
                    .setTitle('⏸️ Music Already Paused')
                    .setDescription('The playback is already paused.')
                    .setColor('#FFA500')
                    .setTimestamp()
                    .setFooter({ text: `Requested by ${interaction.user.username}` });

                await interaction.reply({ embeds: [alreadyPausedEmbed] });
            } else {
                const pausedEmbed = new EmbedBuilder()
                    .setTitle('⏸️ Music Paused')
                    .setDescription('The playback has been paused. Use `/resume` to continue.')
                    .setColor('#8A2BE2')
                    .setTimestamp()
                    .setFooter({ text: `Requested by ${interaction.user.username}` });

                await interaction.reply({ embeds: [pausedEmbed] });
            }
        } catch (error) {
            console.error('Pause command error:', error);
            
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Error')
                .setDescription(`Could not pause: ${error.message}`)
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