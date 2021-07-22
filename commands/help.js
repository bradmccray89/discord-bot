const { help } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Shows help information - needs to be reworked',
    execute(message) {
        message.channel.send(help);
    }
}