const fetch = require('node-fetch');
const he = require('he');
let lastTenInsults = []

module.exports = {
    name: 'insult',
    description: 'Insults tagged users',
    execute(message) {
        if (message.mentions.users.size === 0) {
            message.channel.send(`<@${message.author.id}> ` + 'You need to tag someone to insult them, dummy!')
            return
        }
        message.mentions.users.forEach(async (mention) => {
            const result = await getInsult()
            if (result !== undefined) {
                lastTenInsults.unshift(result.number)
                lastTenInsults.length = lastTenInsults.length > 10 ? 10 : lastTenInsults.length
                const insult = he.decode(result.insult)
                message.channel.send(`${mention} ` + insult);
            }
        });

        async function getInsult() {
            let result = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json').then(response => response.json());
            if (lastTenInsults.includes(result.number)) {
                result = getInsult()
                return result
            } else {
                return result
            }
        }
    }
}


