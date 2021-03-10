const needle = require('needle')

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'meme',
    description: 'Gives Random Meme',
    guildOnly: true,
		aliases: ['fake-meme'],
    cooldown: 3,
    async execute(message, args) {

        needle.get('https://api.imgflip.com/get_memes', (err, res, body) => {

            if (!err && res.statusCode === 200) {

                const meme = body

                const random = (Math.random() * 100) | 0

                const embed = new MessageEmbed()
                .setColor('#ff5050')
                .setImage(meme.data.memes[random].url)
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