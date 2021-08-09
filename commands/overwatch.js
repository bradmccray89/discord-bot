const fetch = require('node-fetch');
const axios = require('axios');

module.exports = {
  name: 'overwatch',
  description: 'gets current arcade playlist',
  async execute(message) {
    axios
      .get('https://overwatcharcade.today/api/v1/overwatch/today')
      .then((response) => {
        const data = response.data.data;
        sendMessage(message, data);
      })
      .catch((error) => {
        console.log(error);
      });
    function sendMessage(message, data) {
      let modeList = ``;
      data.modes.forEach((mode) => {
        if (mode.name.toLowerCase() === 'total mayhem') {
          modeList += `\n- **${mode.name}**`;
        } else {
          modeList += `\n- ${mode.name}`;
        }
      });
      message.channel.send(`Todays Arcade Games on Overwatch:${modeList}`);
    }
  },
};
