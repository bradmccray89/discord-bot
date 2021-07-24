const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const fs = require('fs');

module.exports = {
    name: 'play',
    description: 'Plays a song from a youtube link.',
    async execute(message, args, yoda, channel) {
        const member = channel.guild.members.cache.get(message.author.id)

        if (message.channel.type !== 'dm') return;

        if (yoda.talking === true && !member.hasPermission('ADMINISTRATOR')) {
            console.log(`${member.user.username} tried to use the play command in #${message.channel.name} but is already talking.`);
            return;
        }

        const audioURL = args.shift();
        let playlist = null;
        if (audioURL.match(/^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/)) {
            playlist = await ytpl(audioURL);
        }

        channel.join().then(connection => {
            yoda.volume = 0.3;
            if (playlist !== null) {
                const queue = playlist.items
                playYTPLaylist(queue, connection)
            } else {
                playYTSong(audioURL, connection)
            }
        })

        function playYTPLaylist(queue, connection) {
            const stream = ytdl(queue[0].url, { quality: 'highestaudio', filter: 'audioonly' })
            const fileName = `../audio_clips/${queue[0].title}.mp3`
            stream.pipe(fs.createWriteStream(fileName)).on('finish', () => {
                connection.play(fileName, { volume: yoda.volume })
            })
            // connection.play(stream, { volume: yoda.volume })
            //     .on('start', () => {
            //         yoda.talking = true
            //         return queue.shift()
            //     })
            //     .on('finish', () => {
            //         if (queue.length >= 1) {
            //             return playYTPLaylist(queue, connection)
            //         } else {
            //             yoda.talking = false
            //             return connection.disconnect()
            //         }
            //     })
        }

        function playYTSong(audioURL, connection) {
            try {
                console.log('57')
                const stream = ytdl(audioURL, { quality: 'highestaudio', filter: 'audioonly' });
                console.log('59')
                const filePath = `../audio_clips/${audioURL.title}.mp3`;
                console.log('61')

                stream.pipe(fs.createWriteStream(filePath)).on('finish', () => {
                    console.log('64')
                    connection.play(filePath, { volume: yoda.volume })
                })
            } catch (e) {
                console.log('bacon \n', e)
            }

            // connection.play(ytdl(audioURL, { quality: 'highestaudio', filter: 'audioonly' }), { volume: yoda.volume })
            //     .on('start', () => {
            //         yoda.talking = true
            //     })
            //     .on('finish', () => {
            //         yoda.talking = false
            //         return connection.disconnect()
            //     })
        }
    }
}