const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('overwatch')
    .setDescription('gets current arcade playlist'),

  async execute(interaction) {
    axios
      .get('https://overwatcharcade.today/api/v1/overwatch/today')
      .then((response) => {
        const data = response.data.data;
        sendReply(interaction, data);
      })
      .catch((error) => {
        console.log(error);
      });

    function sendReply(interaction, data) {
      let modeList = ``;
      data.modes.forEach((mode) => {
        if (mode.name.toLowerCase() === 'total mayhem') {
          modeList += `\n- **${mode.name}**`;
        } else {
          modeList += `\n- ${mode.name}`;
        }
      });
      interaction.reply(`Todays Arcade Games on Overwatch:${modeList}`);
    }
  },
};
