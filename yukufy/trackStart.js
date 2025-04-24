const { AttachmentBuilder } = require('discord.js');
const { mewcard } = require("mewcard");
const fs = require("fs");

module.exports = {
    name: 'trackStart',
    async execute({track, queue}) {
        //console.log(track.textChannel.lastMessageId)
        console.log(`[Yukufy] Playing: ${track.title} - ${track.artist} (${track.guildId})`);
        
        const textChannel = track.textChannel;
        if (textChannel) {
            
            const card = new mewcard()
                .setName(track.title)
                .setAuthor(track.artist)
                .setColor("auto")
                .setTheme("themes15")
                .setBrightness(50)
                .setThumbnail(track.thumbnail)
                .setRequester(track.member.user.username);

            const cardBuffer = await card.build();
            const attachment = new AttachmentBuilder(cardBuffer, { name: `mewcard.png` });
            const message = await textChannel.send({ files: [attachment] });
            track.startMessageId = message.id

        }
    }
};