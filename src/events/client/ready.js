const { ActivityType } = require("discord.js");
const client = require("../../client");
const { logger } = require("../../functions/logger");

client.on("ready", async () => {

    console.log("\n---------------------")
    logger(`${client.user.tag} is ready`, "success")
    console.log("---------------------")

    client.user.setPresence({
        activities: [
            {
                name: "yukufy",
                type: ActivityType.Watching
            }
        ],
        status: "online"
    })
})