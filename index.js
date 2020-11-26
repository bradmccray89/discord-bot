const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const fs = require('fs');
const { prefix, cartman_quotes, help } = require('./config.json');
const token = process.env.token || require('./environment.json').token;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'help') {
        message.channel.send(help);
    }
    else if (command === 'cartman') {
        const quote = '"' + cartman_quotes[Math.floor(Math.random() * cartman_quotes.length)] + '"';
        message.channel.send(quote);
    }
    else if (command === 'insult') {
        if (message.mentions.users.size) {
            message.mentions.users.forEach(async(mention) => {
                const { insult } = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json').then(response => response.json());
                message.channel.send(`${mention} ` + insult);
            });
        }
    } else if (command === 'coinflip') {
        const result = Math.floor(Math.random() * 2);
        const coinResult = (result === 1) ? 'Heads' : 'Tails';
        const image = (result === 1) ? './images/heads.png' : './images/tails.png';
        message.channel.send({ files: [image] });
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.channel;
    let oldUserChannel = oldMember.channel;
    var userName = '';
    var fileName = '';
    switch (newMember.id) {
        case '661772640783958052':
            userName = 'Julian';
            fileName = './audio_clips/alex_jones.mp3';
            break;
        case '707469106873368658':
            userName = 'Liam';
            fileName = './audio_clips/uh_oh_alert.mp3';
            break;
        case '318992296181891072':
            userName = 'Brandon';
            fileName = './audio_clips/fart.mp3';
            break;
        case '661775904799850531':
            userName = 'Jacob';
            fileName = './audio_clips/america.mp3';
            break;
        case '770817649189191682':
            break;
        case '708097772586401812':
            userName = 'Paige';
            fileName = './audio_clips/that_was_legitness.mp3';
            break;
        case '316592946973638657':
            userName = 'FattyB';
            break;
        case '161943929665748992':
            userName = 'Corey';
            break;
        default:
            userName = 'A random user';
            fileName = './audio_clips/im_gay.mp3';
    }
    if (newUserChannel !== null && oldUserChannel?.id !== newUserChannel?.id) {
        if (fileName !== '') {
            newUserChannel.join().then(connection => {
                const dispatcher = connection.play(fs.createReadStream(fileName));
                dispatcher.on('finish', () => connection.disconnect());
            })
        }
        if (userName !== '') {
            const time = new Date();
            console.log(`JOINED: ${userName} -> ${newUserChannel.name} - ${time}`);
        }
    } else if (newUserChannel === null && oldUserChannel?.id !== newUserChannel?.id) {
        if (userName !== '') {
            const time = new Date();
            console.log(`LEFT: ${userName} -> ${oldUserChannel.name} - ${time}`);
        }
    }
});

// This is the token used by heroku on production. Can change to local token for testing if needed.
client.login(token);