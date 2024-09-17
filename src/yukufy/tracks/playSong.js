const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const client = require("../../client")
const { mewcard } = require("mewcard");
const fs = require("fs");

client.yukufy.on("playSong", async ({ track }) => {

    const { title, artist, url, duration, source, likes, thumbnail, member, textChannel, guildId } = track;
    
        const card = new mewcard()
            .setName(title)
            .setAuthor(artist)
            .setColor("auto")
            .setTheme("themes15")
            .setBrightness(50)
            .setThumbnail(thumbnail)
            .setRequester(member.user.username)
    
        const cardBuffer = await card.build();

        const attachment = new AttachmentBuilder(cardBuffer, { name: `mewcard.png` });

        await textChannel.send({ files: [attachment], })

})