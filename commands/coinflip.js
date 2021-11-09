const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flips a coin and outputs result to channel.'),

  async execute(interaction) {
    let coin = Math.random() > 0.5 ? 'heads' : 'tails';
    interaction.reply(`The coin landed on **${coin}**!`);
  },
};
