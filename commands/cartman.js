const { cartman_quotes } = require('../config.json');

module.exports = {
    name: 'cartman',
    description: 'Gets a cartman quote and sends it in text channel',
    execute(message) {
        const quote = '"' + cartman_quotes[Math.floor(Math.random() * cartman_quotes.length)] + '"';
        message.channel.send(quote);
    }
}