module.exports = {
    name: 'stop',
    description: 'Stops yoda from talking',
    execute(message, args, yoda, channel) {
        channel.leave()
        const member = channel.guild.members.cache.get(message.author.id)
        if (args.length === 1 && member.hasPermission('ADMINISTRATOR')) {
            timeout = args.shift() * 60000
            yoda.talking = true
            setTimeout(() => {
                yoda.talking = false
            }, timeout)
        } else {
            yoda.talking = false
        }
    }
}