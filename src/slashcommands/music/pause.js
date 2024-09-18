module.exports = {
    name: 'pause',
    description: 'Pause the current song',
    inVoice: true,
    sameVoice: true,
    run: async (client, interaction) => {

        if(client.yukufy.player.state.status === "paused") {
            return interaction.reply(`This current track is already paused`);
        } else {
            client.yukufy.pause();
            return interaction.reply(`Paused the current track`);
        }
        
    },
};