const { Client, CommandInteraction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play a song in the voice channel',
    inVoice: true,
    options: [
        {
            name: 'query',
            description: 'Name of the song or URL',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     * @returns 
     */

    run: async (client, interaction, args) => {

        const song = interaction.options.getString('query');
        const channel = interaction.member.voice.channel;
        const source = "spotify"; // "soundcloud"

        try {
          const music = await client.yukufy.play(song, channel, source, {
            member: interaction.member,
            textChannel: interaction.channel,
            guildId: interaction.guild.id
          });
          if (!music) {
            await interaction.reply('❌ Song not found.');
            return;
          }
          const title = music.title || 'Title not available';
          const artist = music.artist || 'Artist not available';
          const duration = music.duration || 'Duration not available';
          
          await interaction.reply({
            content: `🔊 Searching... Song found: **${artist}** - **${title}** | **${duration}**`,
            ephemeral: true
          });
        } catch (error) {
          await interaction.reply('❌ Error playing song');
          console.error(error);
        }

    },
};