const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	createAudioPlayer,
	createAudioResource,
	AudioPlayerStatus,
	joinVoiceChannel,
	VoiceConnectionStatus,
} = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cocaine')
		.setDescription(
			'Plays the audio clip of Theo Von talking about his favorite type of weed.'
		),

	async execute(interaction, yoda) {
		console.log('cocaine command triggered', interaction.member.voice.channel);
		var userChannel = interaction.member.voice.channel;
		var fileName = './audio_clips/favorite_weed_is_cocaine.mp3';
		var resource = createAudioResource(fileName);
		playYodaIntro(resource);
		interaction.reply('Playing Theo Von.');

		function playYodaIntro(resource, index = 1, limit = 1) {
			if (!yoda.talking) {
				const connection = joinVoiceChannel({
					channelId: userChannel.id,
					guildId: userChannel.guild.id,
					adapterCreator: userChannel.guild.voiceAdapterCreator,
				});
				connection.on(VoiceConnectionStatus.Ready, async () => {
					const player = createAudioPlayer();
					yoda.talking = true;
					resource.playStream.once(`readable`, () => {
						player.play(resource);
					});
					connection.subscribe(player);

					player.on('stateChange', async (oldState, newState) => {
						if (newState.status === AudioPlayerStatus.Idle && limit <= index) {
							yoda.talking = false;
							player.stop();
							connection.disconnect();
						}
					});
					player.on('error', (error) => {
						console.log('error', error.message);
					});
				});
			}
		}
	},
};
