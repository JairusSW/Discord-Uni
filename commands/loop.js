const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'loop',
    description: 'loop command.',
    aliases: ['lp'],
    guildOnly: true,
	cooldown: 3,
	async execute(message, args) {

		try {

        const userQueue = message.client.queue.get(message.author.id)
        
        if (!userQueue) {
            
            const noloop = new MessageEmbed()
			.setTitle('Nothing To Loop.')
			.setColor('#ff5050')
			.setTimestamp()
			.setFooter(message.author.username)

            message.channel.send(noloop)
            
            return

        }


        if (userQueue.loop === true) {

            userQueue.loop = false

            const loopOff = new MessageEmbed()
            .setTitle('Loop Off.')
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(loopOff)

            return

        }

        if (userQueue.loop === false) {

            userQueue.loop = true

            const loopOn = new MessageEmbed()
            .setTitle('Loop On.')
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(loopOn)
            
        }    

					} catch (err) {

				const Unavaliable = new MessageEmbed()
		.setTitle('Something Happened.')
		.setColor('#ff5050')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(Unavaliable)

	}    
		
    }
    
}
