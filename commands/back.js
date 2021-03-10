const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'back',
	description: 'Back command.',
	aliases: ['bk'],
  cooldown: 3,
  guildOnly: true,
	async execute(message, args) {

	try {

		const { channel } = message.member.voice

		if (!channel) {
			
			const noChannel = new MessageEmbed()
			.setTitle('Nothing To Reverse.')
			.setColor('#ff5050')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noChannel)

			return

		}

		const userQueue = message.client.queue.get(message.author.id)

		if (!userQueue) {
			
			const noSkip = new MessageEmbed()
			.setTitle('Nothing To Revert.')
			.setColor('#ff5050')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noSkip)

			return

		}

    userQueue.location = userQueue.location - 2

		userQueue.connection.dispatcher.end()

		const Skip = new MessageEmbed()
		.setTitle('Reverted.')
		.setColor('#ff5050')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(Skip)

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