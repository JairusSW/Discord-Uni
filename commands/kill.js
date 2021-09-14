const DIG = require('discord-image-generation')

const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
	name: 'kill',
	description: 'Restart the bot',
	cooldown: 1,
	guildOnly: false,
	async execute(message, args) {
		
		try {

			if (message.author.id.toString() == process.env.ownerId.toString()) {
				await message.channel.send('Killed.')
				process.exit(0)
			} else {
				message.channel.send('Sorry, you can\'t do that!')
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