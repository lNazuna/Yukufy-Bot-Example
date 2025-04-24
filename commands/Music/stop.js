const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the playback and clear the queue'),
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
            await yukufy.stop(guildId);

            const stopEmbed = new EmbedBuilder()
                .setTitle('🛑 Playback Stopped')
                .setDescription('The playback has been stopped and the queue has been cleared.')
                .setColor('#8A2BE2')
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.username}` });

            await interaction.reply({ embeds: [stopEmbed] });

        } catch (error) {
            console.error('Stop command error:', error);
            
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Error')
                .setDescription(`Could not stop: ${error.message}`)
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