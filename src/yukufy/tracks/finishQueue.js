const client = require("../../client")

client.yukufy.on("finishQueue", async ({ track }) => {

    const { title, artist, url, duration, source, likes, thumbnail, member, textChannel, guildId } = track;
    textChannel.send('🔚 Music queue finished.');

})