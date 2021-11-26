const { Collection, Client, Intents } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});
const dotenv = require('dotenv');
const token = process.env.token || require('./environment.json').token;
const fs = require('fs');
const voiceIntro = require('./events/voice-intro.js');

dotenv.config();

let yoda = {
  talking: false,
  volume: 1,
};

client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  console.log(
    `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
  );
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    await interaction.reply({
      content: `There was an error while executing this command! ${error}`,
      ephemeral: true,
    });
  }
});

client.on('disconnect', () => {
  yoda.talking = false;
});

client.on('voiceStateUpdate', (oldState, newState) => {
  // If Yoda leaves a voice channel set talking to false
  if (
    newState.channelId === null &&
    oldState.channelId !== newState.channelId
  ) {
    if (oldState.id === '770817649189191682') {
      // Yoda bot ID
      yoda.talking = false;
    }
  }
  voiceIntro.execute(oldState, newState, yoda);
});

// This is the token used by heroku on production. Can change to local token for testing if needed.
client.login(token);

// Express API server
require('./server.js');
