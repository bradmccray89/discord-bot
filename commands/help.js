const { help } = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows help information - needs to be reworked'),

  async execute(interaction) {
    interaction.reply(help);
  },
};
