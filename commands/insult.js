const axios = require('axios');
const he = require('he');
const { SlashCommandBuilder } = require('@discordjs/builders');
let lastTenInsults = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('insult')
    .setDescription('Insults a user')
    .addUserOption(option => 
      option.setName('target')
        .setDescription('The user to insult')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('target');
    const result = await getInsult();
    if (result !== undefined) {
      lastTenInsults.unshift(result.number);
      lastTenInsults.length =
        lastTenInsults.length > 10 ? 10 : lastTenInsults.length;
      const insult = he.decode(result.insult);
      interaction.reply(`${user}, ${insult}`);
    }

    async function getInsult() {
      let result = axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json').then(res => {
        return res.data;
      });
      if (lastTenInsults.includes(result.number)) {
        result = getInsult();
        return result;
      } else {
        return result;
      }
    }
  },
};
