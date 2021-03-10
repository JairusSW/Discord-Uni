const needle = require('needle')

const { getUserFromMention } = require('../util/util')

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'advice',
    description: 'Gives Random Advice',
    usage: '[question]',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {

        needle.get('https://api.adviceslip.com/advice', (err, res, body) => {

            if (!err && res.statusCode === 200) {

                const user = getUserFromMention(args[0], message.client) || message.author

                const advice = JSON.parse(body)

                if (user == null) {

                    const embed = new MessageEmbed()
                    .setTitle('Give Advice To A Real Person')
                    .setColor('#ff5050')
                    .setTimestamp()
                    .setFooter(message.author.username)
            
                    message.channel.send(embed)

                    return

                }

                const embed = new MessageEmbed()
                .setTitle(`${user.username}, ${advice.slip.advice}`)
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