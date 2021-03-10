const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'shuffle',
    description: 'Shuffle command.',
    aliases: ['sf'],
    guildOnly: true,
	cooldown: 3,
	async execute(message, args) {

    try {

        const userQueue = message.client.queue.get(message.author.id)
        
        if (!userQueue) {
            
            const noShuffle = new MessageEmbed()
			.setTitle('Nothing To Shuffle.')
			.setColor('#ff5050')
			.setTimestamp()
			.setFooter(message.author.username)

            message.channel.send(noShuffle)
            
            return

        }


        if (userQueue.shuffle === true) {

            userQueue.shuffle = false

            const shuffleOff = new MessageEmbed()
            .setTitle('Shuffle Off.')
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(shuffleOff)

            return

        }

        if (userQueue.shuffle === false) {

            userQueue.shuffle = true

            const shuffleOn = new MessageEmbed()
            .setTitle('Shuffle On.')
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(shuffleOn)
            
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
