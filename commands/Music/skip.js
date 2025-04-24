const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip to the next song'),
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
            await yukufy.skip(guildId);

            const skipEmbed = new EmbedBuilder()
                .setTitle('⏭️ Song Skipped')
                .setDescription('Skipping to the next song in queue.')
                .setColor('#8A2BE2')
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.username}` });

            await interaction.reply({ embeds: [skipEmbed] });

        } catch (error) {
            console.error('Skip command error:', error);
            
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Error')
                .setDescription(`Could not skip: ${error.message}`)
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