const { ActivityType } = require("discord.js");
const client = require("../../client");
const { logger } = require("../../functions/logger");

client.on("ready", async () => {

    console.log("\n---------------------")
    logger(`${client.user.tag} is ready`, "success")
    console.log("---------------------")

    const serverCount = client.guilds.cache.size.toLocaleString('en-US')
    const userCount = client.guilds.cache.reduce((a, g) => a+g.memberCount, 0)

    let status = [
        `yukufy`,
        `/help | ${serverCount} Servers`,
        `/help | ${userCount} users`,
    ],
    i = 0
    setInterval(() => {
        client.user.setActivity(`${status[i++ % status.length]}`, {
            type: ActivityType.Watching
        })
    }, 60000); // Only Milliseconds
})