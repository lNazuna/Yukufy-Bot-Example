module.exports = {
    name: 'skip',
    description: 'Skip to the next song in the queue',
    inVoice: true,
    sameVoice: true,
    run: async (client, interaction) => {

        client.yukufy.skip();
        await interaction.reply('⏭️ Song skipped.');

    },
};