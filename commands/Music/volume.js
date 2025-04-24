const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Adjust the playback volume')
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('Volume level between 0 and 100')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(100)
        ),
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

            const level = interaction.options.getInteger('level');
            const guildId = interaction.guildId;

            await yukufy.setVolume(guildId, level);

            let volumeEmoji;
            if (level === 0) volumeEmoji = '🔇';
            else if (level <= 30) volumeEmoji = '🔈';
            else if (level <= 70) volumeEmoji = '🔉';
            else volumeEmoji = '🔊';

            const volumeEmbed = new EmbedBuilder()
                .setTitle(`${volumeEmoji} Volume Adjusted`)
                .setDescription(`Volume has been set to ${level}%.`)
                .setColor('#8A2BE2')
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.username}` });

            await interaction.reply({ embeds: [volumeEmbed] });

        } catch (error) {
            console.error('Volume command error:', error);
            
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Error')
                .setDescription(`Could not adjust volume: ${error.message}`)
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