const fs = require('fs');
const {
	createAudioPlayer,
	createAudioResource,
	AudioPlayerStatus,
	joinVoiceChannel,
	getVoiceConnection,
	VoiceConnectionStatus,
} = require('@discordjs/voice');

module.exports = {
	name: 'voice-intro',
	description: 'Plays a voice intro for each person who enters voice chat',
	async execute(oldState, newState, yoda) {
		let newUserChannel = newState.channel;
		let oldUserChannel = oldState.channel;
		var userName = '';
		var fileName = '';

		switch (newState.id) {
			case '661772640783958052':
				userName = 'Julian';
				fileName = './audio_clips/exposed.mp3';
				break;
			case '707469106873368658':
				userName = 'Liam';
				fileName = './audio_clips/delivery_lethal_company.mp3';
				break;
			case '318992296181891072':
				userName = 'Brandon';
				fileName = './audio_clips/cocaine.mp3';
				break;
			case '661775904799850531':
				userName = 'Jacob';
				fileName = './audio_clips/america.mp3';
				break;
			case '770817649189191682': // This is Yoda (BOT).
				break;
			case '708097772586401812':
				userName = 'Paige';
				fileName = './audio_clips/fresh_meat.mp3';
				break;
			case '762503812694540309':
				userName = 'Gavin';
				fileName = './audio_clips/prophecy.mp3';
				break;
			case '316592946973638657':
				userName = 'FattyB';
				fileName = './audio_clips/peter_griffin_uhoh.mp3';
				break;
			case '161943929665748992':
				userName = 'Corey';
				break;
			case '777003750246055969':
				userName = 'Andrew B.';
				fileName = './audio_clips/im_joe_bidens_husband.mp3';
				break;
			case '302988754124013568':
				userName = 'Garrett';
				fileName = './audio_clips/im_just_pete.mp3';
				break;
			case '513550178226274304':
				userName = 'Jylante';
				fileName = './audio_clips/cartman_slave_song.mp3';
				break;
			case '184405311681986560': // Fredboat
				break;
			default:
				userName = 'A random user';
				fileName = './audio_clips/tadaah.mp3';
		}
		if (newUserChannel !== null && oldUserChannel?.id !== newUserChannel?.id) {
			const user = newUserChannel.guild.members.cache.get(newState.id);
			const role = await newUserChannel.guild.roles.fetch('1112428750685081732');
			for (const member of newUserChannel.members) {
				member.presence?.activities.forEach((activity) => {
					if (activity.type === 'STREAMING') {
						fileName = '';
					}
				});
			}

			if (fileName !== '') {
				const resource = createAudioResource(fileName);
				playYodaIntro(resource);
			}

			if (user) {
				user.roles.add(role);
			}

			if (userName !== '') {
				const time = new Date();
				var userActivity = '';

				user.presence?.activities.forEach((activity, index) => {
					userActivity =
						index === 0
							? userActivity.concat(activity.type)
							: userActivity.concat(', ', activity.type);
				});

				console.log(
					`JOINED: ${userName} (${userActivity}) -> ${newUserChannel.name} - ${time}`
				);
			}
		} else if (
			newUserChannel === null &&
			oldUserChannel?.id !== newUserChannel?.id
		) {
			const user = oldUserChannel.guild.members.cache.get(newState.id);
			const role = await oldUserChannel.guild.roles.fetch('1112428750685081732');

			if (user) {
				const hasRole = user.roles.cache.has('1112428750685081732');
				if (hasRole) {
					user.roles.remove(role);
				}
			}
			if (userName !== '') {
				const time = new Date();
				console.log(`LEFT: ${userName} -> ${oldUserChannel.name} - ${time}`);
			}
		}

		function playYodaIntro(resource, index = 1, limit = 1) {
			if (!yoda.talking) {
				const connection = joinVoiceChannel({
					channelId: newUserChannel.id,
					guildId: newUserChannel.guild.id,
					adapterCreator: newUserChannel.guild.voiceAdapterCreator,
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
