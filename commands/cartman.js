const { cartman_quotes } = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cartman')
    .setDescription('Gets a cartman quote and sends it in text channel'),

  async execute(interaction) {
    const quote =
      '"' +
      cartman_quotes[Math.floor(Math.random() * cartman_quotes.length)] +
      '"';
    interaction.reply(quote);
  },
};
