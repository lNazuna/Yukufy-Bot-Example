module.exports = {
    name: 'resume',
    description: 'Resume the paused song',
    inVoice: true,
    sameVoice: true,
    run: async (client, interaction) => {

        if(client.yukufy.player.state.status === "playing") {
            return interaction.reply('This current track is not paused')
        } else {
            client.yukufy.resume();
            await interaction.reply('▶️ Music resumed.');
        }

    },
};