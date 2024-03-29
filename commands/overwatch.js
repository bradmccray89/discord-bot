const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('overwatch')
		.setDescription('gets current arcade playlist'),

	async execute(interaction, yoda) {
		axios
			.get('https://overwatcharcade.today/api/v1/overwatch/today')
			.then((response) => {
				const data = response.data.data;
				sendReply(interaction, data);
			})
			.catch((error) => {
				interaction.reply({
					content:
						"This command was made for Overwatch 1, but Blizzard hates fun so they didn't make an API for Overwatch 2. Sorry! :'(",
					ephemeral: true,
				});
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
