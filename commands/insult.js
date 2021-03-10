const needle = require('needle')

const { getUserFromMention } = require('../util/util')

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'insult',
    description: 'Gives Random Insults',
    usage: '[user]',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {

        needle.get('https://quandyfactory.com/insult/json/', (err, res, body) => {

            if (!err && res.statusCode === 200) {

                const user = getUserFromMention(args[0], message.client) || message.author

                if (user == null) {

                    const embed = new MessageEmbed()
                    .setTitle('Insult A Real Person')
                    .setColor('#ff5050')
                    .setTimestamp()
                    .setFooter(message.author.username)
            
                    message.channel.send(embed)

                    return

                }

                const embed = new MessageEmbed()
                .setTitle(`${user.username}, ${body['insult']}`)
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
        
                message.channel.send(embed)

                return

            }

            const error = new MessageEmbed()
            .setTitle('Something Happened.')
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)
    
            message.channel.send(error)
            
            return
            
        })
    }
}