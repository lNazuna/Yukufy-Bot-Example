module.exports = {
    name: 'resume',
    description: 'Resume the paused song',
    inVoice: true,
    sameVoice: true,
    run: async (client, interaction) => {

        client.yukufy.resume();
        await interaction.reply('▶️ Music resumed.');

    },
};