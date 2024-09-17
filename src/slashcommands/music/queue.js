const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Shows the current queue',
    inVoice: true,
    sameVoice: true,

    run: async (client, interaction) => {
      try {
        const queue = await client.yukufy.getQueue();
        if (queue.length === 0) {
          await interaction.reply('The queue is empty.');
        } else {

          const queue3 = queue.length > 9 ? queue.slice(0, 9) : queue.length;
  
          const embed = new EmbedBuilder()
              .setColor('Aqua')
              .setTitle('Now Playing')
              .setThumbnail(queue.thumbnail)
              .setDescription(`[${queue[0].title}](${queue[0].url}) [${(queue[0].duration)}]`)
              .setFooter({ text: `Queue length: ${queue.length} tracks` });

              console.log(queueString)
  
          if (queue3.length)
              embed.addFields([
                  {
                      name: 'Up Next',
                      value: queue3
                          .map(
                              (track, index) =>
                                  `**${index + 1}.** [${track.title}](${track.url})`,
                          )
                          .join('\n'),
                  },
              ]);
  
          return interaction.reply({ embeds: [embed] });


        }
      } catch (error) {
        console.error('Error getting the queue:', error);
        await interaction.reply('An error occurred while trying to get the song queue.');
      }
    },
};