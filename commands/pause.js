const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'pause',
	description: 'Pause command.',
	aliases: ['ps'],
	guildOnly: true,
	cooldown: 3,
	async execute(message, args) {

	try {

		const userQueue = message.client.queue.get(message.author.id)

		if (userQueue && userQueue.playing === true) {

			userQueue.connection.dispatcher.pause()
			
			userQueue.playing = false

			const Pause = new MessageEmbed()
			.setTitle('Paused.')
			.setColor('#ff5050')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(Pause)

			return

		}
		
		const noPause = new MessageEmbed()
		.setTitle('Nothing To Pause.')
		.setColor('#ff5050')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(noPause)

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
