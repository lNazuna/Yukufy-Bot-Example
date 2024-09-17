const client = require("../../client")

client.yukufy.on("addSong", async ({ track }) => {

    const { title, artist, url, duration, source, likes, thumbnail, member, textChannel, guildId } = track;
    textChannel.send(`🎵 Song **${artist} - ${title}** added to queue by **${member.displayName}**`);

})