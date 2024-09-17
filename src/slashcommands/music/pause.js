module.exports = {
    name: 'pause',
    description: 'Pause the current song',
    inVoice: true,
    sameVoice: true,
    run: async (client, interaction) => {

        client.yukufy.pause();

        return interaction.reply(`Paused the current track`);
    },
};