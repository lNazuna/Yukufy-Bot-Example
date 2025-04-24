const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

async function loadYukufy(client) {
    console.log(chalk.blue.bold('INFO: ') + "INITIATING YUKUFY");

    const yukufyPath = path.join(__dirname, '..', 'yukufy');
    
    if (!fs.existsSync(yukufyPath)) {
        fs.mkdirSync(yukufyPath, { recursive: true });
    }

    const yukufyFiles = fs.readdirSync(yukufyPath).filter(file => file.endsWith('.js'));

    for (const file of yukufyFiles) {
        try {
            const filePath = path.join(yukufyPath, file);
            const event = require(filePath);

            if (event.name && typeof event.name !== 'string') {
                console.log(chalk.red.bold('ERROR: ') + `Couldn't load the yukufy event ${file}, error: Property name should be string.`);
                continue;
            }

            event.name = event.name || file.replace('.js', '');

            const yukufy = client.yukufy || global.yukufy;
            if (yukufy && typeof event.execute === 'function') {
                yukufy.on(event.name, (...args) => event.execute(...args, client));
            }

            console.log(chalk.blue.bold('INFO: ') + `[YUKUFY] Loaded ${event.name}`);
        } catch (err) {
            console.log(chalk.red.bold('ERROR: ') + `Couldn't load the yukufy event ${file}`);
            console.error(err);
            continue;
        }
    }
}

module.exports = { loadYukufy };