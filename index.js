const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');
const token = process.env.token || require('./environment.json').token;
const fs = require('fs');
const voiceIntro = require('./features/voice-intro.js')

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

let yoda = {
    talking: false,
    volume: 1,
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('presenceUpdate', (oldMember, newMember) => {
    // Do something when people start and stop games
})

client.on('message', async message => {
    const mainVoiceChannel = client.channels.cache.get('701598004171505709'); //'Sexy People Only' in 'Beasts of Gaming'

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return

    try {
        client.commands.get(command).execute(message, args, yoda, mainVoiceChannel);
    } catch (error) {
        console.error(error);
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    voiceIntro.execute(oldMember, newMember, yoda);
});

// This is the token used by heroku on production. Can change to local token for testing if needed.
client.login(token);
