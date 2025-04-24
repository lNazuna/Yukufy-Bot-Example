const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search for a song')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Song name to search')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('source')
                .setDescription('Music source')
                .setRequired(false)
                .addChoices(
                    { name: 'Spotify', value: 'spotify' },
                    { name: 'SoundCloud', value: 'soundcloud' },
                )
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

            await interaction.deferReply();

            const query = interaction.options.getString('query');
            const source = interaction.options.getString('source') || 'spotify';

            const searchResults = await yukufy.search(query, source);

            if (!searchResults || searchResults.length === 0) {
                const noResultsEmbed = new EmbedBuilder()
                    .setTitle('🔍 No Results')
                    .setDescription(`No results found for "${query}" on ${source}.`)
                    .setColor('#FFA500')
                    .setTimestamp()
                    .setFooter({ text: `Requested by ${interaction.user.username}` });

                return interaction.editReply({ embeds: [noResultsEmbed] });
            }

            const results = searchResults.slice(0, 10);

            const resultsList = results.map((track, index) => 
                `**${index + 1}.** ${track.title} - ${track.artist} | ${track.duration}`
            ).join('\n');

            const sourceIcons = {
                'spotify': '🟢',
                'soundcloud': '🟠'
            };

            const resultsEmbed = new EmbedBuilder()
                .setTitle(`🔍 Search Results ${sourceIcons[source] || ''}`)
                .setDescription(`Results for "${query}" on ${source}:\n\n${resultsList}\n\nUse \`/play ${query}\` to play the first result.`)
                .setColor('#8A2BE2')
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.username}` });

            await interaction.editReply({ embeds: [resultsEmbed] });

        } catch (error) {
            console.error('Search command error:', error);
            
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Error')
                .setDescription(`Could not perform search: ${error.message}`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.username}` });

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    }
};