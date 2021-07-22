const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

module.exports = {
    name: 'play',
    description: 'Plays a song from a youtube link.',
    async execute(message, args, yoda, channel) {
        const member = channel.guild.members.cache.get(message.author.id)

        if (message.channel.type !== 'dm') return;

        if (yoda.talking === true && !member.hasPermission('ADMINISTRATOR')) return;

        const audioURL = args.shift();
        const playlist = await ytpl(audioURL);

        channel.join().then(connection => {
            yoda.volume = 0.3;
            if (playlist.estimatedItemCount > 0) {
                const queue = playlist.items
                playYTPLaylist(queue, connection)
            } else {
                playYTSong(audioURL, connection)
            }
        })

        function playYTPLaylist(queue, connection) {
            connection.play(ytdl(queue[0].url, { quality: 'highestaudio', filter: 'audioonly' }), { volume: yoda.volume })
                .on('start', () => {
                    yoda.talking = true
                    return queue.shift()
                })
                .on('finish', () => {
                    if (queue.length >= 1) {
                        return playYTPLaylist(queue, connection)
                    } else {
                        yoda.talking = false
                        return connection.disconnect()
                    }
                })
        }

        function playYTSong(audioURL, connection) {
            connection.play(ytdl(audioURL, { quality: 'highestaudio', filter: 'audioonly' }), { volume: yoda.volume })
                .on('start', () => {
                    yoda.talking = true
                })
                .on('finish', () => {
                    yoda.talking = false
                    return connection.disconnect()
                })
        }
    }
}