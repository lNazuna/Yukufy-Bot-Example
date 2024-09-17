const client = require("../../client")

client.yukufy.on("emptyQueue", async ({ track }) => {

    const { title, artist, url, duration, source, likes, thumbnail, member, textChannel, guildId } = track;
    textChannel.send('I was waiting, no more songs were added to the queue, so I am leaving...');

})