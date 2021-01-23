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

// client.on('presenceUpdate', (oldPresence, newPresence) => {
//     if (oldPresence.userID === '318992296181891072') {
//         console.log('test');
//         console.log('oldPresence', oldPresence);
//         console.log('newPresence', newPresence);
//     }
// })

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
            fileName = './audio_clips/carl_wheezer_ahh.mp3';
            break;
        case '318992296181891072':
            userName = 'Brandon';
            fileName = './audio_clips/among_us.mp3';
            break;
        case '661775904799850531':
            userName = 'Jacob';
            fileName = './audio_clips/america.mp3';
            break;
        case '770817649189191682': // This is Yoda (BOT).
            break;
        case '708097772586401812':
            userName = 'Paige';
            fileName = './audio_clips/that_was_legitness.mp3';
            break;
        case '762503812694540309':
            userName = 'Gavin';
            fileName = './audio_clips/my_favorite_popsicle.mp3';
            break;
        case '316592946973638657':
            userName = 'FattyB';
            break;
        case '161943929665748992':
            userName = 'Corey';
            break;
        case '777003750246055969':
            userName = 'Andrew B.';
            fileName = './audio_clips/im_joe_bidens_husband.mp3';
            break;
        default:
            userName = 'A random user';
            fileName = './audio_clips/fart.mp3';
    }
    if (newUserChannel !== null && oldUserChannel?.id !== newUserChannel?.id) {

        for (const [memberID, member] of newUserChannel.members) {
            member.presence.activities.forEach(activity => {
                if (activity.type === 'STREAMING') {
                    fileName = '';
                }
            })
        }
        if (fileName !== '') {
            newUserChannel.join().then(connection => {
                const dispatcher = connection.play(fs.createReadStream(fileName));
                dispatcher.on('finish', () => connection.disconnect());
            })
        }
        if (userName !== '') {
            const time = new Date();
            const user = newUserChannel.guild.members.cache.get(newMember.id);
            var userActivity = '';
            user.presence.activities.forEach((activity, index) => {
                userActivity = (index === 0) ? userActivity.concat(activity.type) : userActivity.concat(', ', activity.type);
            })
            console.log(`JOINED: ${userName} (${userActivity}) -> ${newUserChannel.name} - ${time}`);
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