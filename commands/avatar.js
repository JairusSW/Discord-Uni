const { getUserFromMention } = require('../util/util')

const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    name: 'avatar',
    description: 'Get A User\'s Avatar',
    usage: '[user]',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {

        if (args[0]) {

            const user = getUserFromMention(args[0], message.client) || message.author

            if (user == null) {

                const invalid = new MessageEmbed()
                .setTitle('Invalid Mention')
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
        
                return message.channel.send(invalid)

            }
    
            const users = new MessageAttachment(user.displayAvatarURL())
    
            return message.channel.send(users)

        }
    
        const authors = new MessageAttachment(message.author.displayAvatarURL())

        message.channel.send(authors)

        return

    }
}