const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Song name or URL')
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

            let dots = '';
            const loadingMessage = await interaction.editReply('🎵 Loading song');
            
            const loadingInterval = setInterval(async () => {
                dots = dots.length >= 3 ? '' : dots + '.';
                try {
                    await loadingMessage.edit(`🎵 Loading song${dots}`);
                } catch (e) {
                    clearInterval(loadingInterval);
                }
            }, 500);

            const query = interaction.options.getString('query');
            const source = interaction.options.getString('source') || 'spotify';
            const voiceChannel = interaction.member.voice.channel;

            if (!voiceChannel) {
                clearInterval(loadingInterval);
                const noVoiceEmbed = new EmbedBuilder()
                    .setTitle('❌ Error')
                    .setDescription('You need to be in a voice channel!')
                    .setColor('#FF0000')
                    .setTimestamp()
                    .setFooter({ text: `Requested by ${interaction.user.username}` });

                return interaction.editReply({ content: '', embeds: [noVoiceEmbed] });
            }

            const track = await yukufy.play({
                query,
                voiceChannel,
                textChannel: interaction.channel,
                member: interaction.member,
                source
            });

            clearInterval(loadingInterval);
            await interaction.deleteReply();

        } catch (error) {
            console.error('Play command error:', error);
            
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Error')
                .setDescription(`Could not play the song: ${error.message}`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.username}` });

            await interaction.editReply({ content: '', embeds: [errorEmbed] });
        }
    }
};