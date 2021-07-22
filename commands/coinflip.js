module.exports = {
    name: 'coinflip',
    description: 'Flips a coin and outputs result to channel.',
    execute(message) {
        let coin = Math.random() > 0.5 ? 'heads' : 'tails';
        message.channel.send(`The coin landed on **${coin}**!`);
    }
}