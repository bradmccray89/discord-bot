const fs = require('fs');
const {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  joinVoiceChannel,
} = require('@discordjs/voice');
const player = createAudioPlayer();

module.exports = {
  name: 'voice-intro',
  description: 'Plays a voice intro for each person who enters voice chat',
  async execute(oldMember, newMember, yoda) {
    let newUserChannel = newMember.channel;
    let oldUserChannel = oldMember.channel;
    var userName = '';
    var fileName = '';

    switch (newMember.id) {
      case '661772640783958052':
        userName = 'Julian';
        fileName = './audio_clips/exposed.mp3';
        break;
      case '707469106873368658':
        userName = 'Liam';
        fileName = './audio_clips/im_going_to_shit_yourself.mp3';
        break;
      case '318992296181891072':
        userName = 'Brandon';
        fileName = './audio_clips/fart.mp3';
        break;
      case '661775904799850531':
        userName = 'Jacob';
        fileName = './audio_clips/america.mp3';
        break;
      case '770817649189191682': // This is Yoda (BOT).
        break;
      case '708097772586401812':
        userName = 'Paige';
        fileName = './audio_clips/that_was_legitness.mp3';
        break;
      case '762503812694540309':
        userName = 'Gavin';
        fileName = './audio_clips/4_big_guys.mp3';
        break;
      case '316592946973638657':
        userName = 'FattyB';
        break;
      case '161943929665748992':
        userName = 'Corey';
        break;
      case '777003750246055969':
        userName = 'Andrew B.';
        fileName = './audio_clips/im_joe_bidens_husband.mp3';
        break;
      default:
        userName = 'A random user';
        fileName = './audio_clips/tadaah.mp3';
    }
    if (newUserChannel !== null && oldUserChannel?.id !== newUserChannel?.id) {
      for (const member of newUserChannel.members) {
        member.presence?.activities.forEach((activity) => {
          if (activity.type === 'STREAMING') {
            fileName = '';
          }
        });
      }
      if (fileName !== '') {
        const resource = createAudioResource(fileName);
        const connection = joinVoiceChannel({
          channelId: newUserChannel.id,
          guildId: newUserChannel.guild.id,
          adapterCreator: newUserChannel.guild.voiceAdapterCreator,
        });
        playYodaIntro(connection, resource);
      }
      if (userName !== '') {
        const time = new Date();
        const user = newUserChannel.guild.members.cache.get(newMember.id);
        var userActivity = '';
        user.presence.activities.forEach((activity, index) => {
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
      if (userName !== '') {
        const time = new Date();
        console.log(`LEFT: ${userName} -> ${oldUserChannel.name} - ${time}`);
      }
    }

    function playYodaIntro(connection, resource, index = 1, limit = 1) {
      if (!yoda.talking) {
        yoda.talking = true;
        player.play(resource);

        connection.subscribe(player);

        player.on('stateChange', (oldState, newState) => {
          if (newState.status === AudioPlayerStatus.Idle) {
            if (limit <= index) {
              yoda.talking = false;
              connection.destroy();
            }
          }
        });
      }
    }
  },
};
