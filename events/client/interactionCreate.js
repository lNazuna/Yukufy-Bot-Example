const { EmbedBuilder, MessageFlags, Collection } = require("discord.js");
const chalk = require("chalk");
const { OWNER_ID, LOGS } = require('../../config')


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.log(chalk.yellow(`Command "${interaction.commandName}" not found.`));
            return;
        }

        if (command.ownerOnly) {
            if (interaction.user.id !== OWNER_ID) {
                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`\`❌\` | This command is owner-only. You cannot run this command.`)

                return await interaction.reply({
                    embeds: [embed],
                    flags: MessageFlags.Ephemeral
                });
            }
        }

        if (command.userPermissions) {
            const memberPermissions = interaction.member.permissions;
            const missingPermissions = command.userPermissions.filter(perm => !memberPermissions.has(perm));

            if (missingPermissions.length) {

                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`\`❌\` | You lack the necessary permissions to execute this command: \`\`\`${missingPermissions.join(", ")}\`\`\``)

                return await interaction.reply({
                    embeds: [embed],
                    flags: MessageFlags.Ephemeral
                });
            }
        }



        if (command.botPermissions) {
            const botPermissions = interaction.guild.members.me.permissions;
            const missingBotPermissions = command.botPermissions.filter(perm => !botPermissions.has(perm));
            if (missingBotPermissions.length) {


                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`\`❌\` | I lack the necessary permissions to execute this command: \`\`\`${missingBotPermissions.join(", ")}\`\`\``)

                return await interaction.reply({
                    embeds: [embed],
                    flags: MessageFlags.Ephemeral
                });
            }
        }

        if (!client.cooldowns) client.cooldowns = new Collection();
        const now = Date.now();
        const cooldownAmount = (command.cooldown || 3) * 1000;
        
        if (!client.cooldowns.has(command.data.name)) {
            client.cooldowns.set(command.data.name, new Collection());
        }
        
        const timestamps = client.cooldowns.get(command.data.name);
        const userCooldown = timestamps.get(interaction.user.id);

        if (userCooldown) {
            const expirationTime = userCooldown + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;

                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`\`❌\` | Please wait **${timeLeft.toFixed(1)}** more second(s) before reusing the command.`)

                return await interaction.reply({
                    embeds: [embed],
                    flags: MessageFlags.Ephemeral
                });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        try {
            await command.execute(interaction, client);
            const logEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Command Executed')
                .addFields(
                    { name: 'User', value: `${ interaction.user.tag }(${ interaction.user.id })`, inline: true },
                    { name: 'Command', value: `/ ${ command.data.name }`, inline: true },
                    { name: 'Server', value: `${ interaction.guild.name }(${ interaction.guild.id })`, inline: true },
                    { name: 'Timestamp', value: new Date().toLocaleString(), inline: true }
                )
                .setTimestamp();

            if (LOGS.COMMANDS) {
                if (!LOGS.COMMANDS) return;
                const logsChannel = client.channels.cache.get(LOGS.COMMANDS);
                if (logsChannel) {
                    await logsChannel.send({ embeds: [logEmbed] });
                } else {
                    console.error(chalk.yellow(`Logs channel with ID ${ LOGS.COMMANDS } not found.`));
                }
            }
        } catch (error) {
            console.error(chalk.red(`Error executing command "${command.data.name}": `), error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral
            });

        }
    },
};
