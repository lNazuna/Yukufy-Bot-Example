const client = require("../../client")

client.yukufy.on("clientDisconnect", async () => {

    console.log('👋 Disconnected from the voice channel.');

})