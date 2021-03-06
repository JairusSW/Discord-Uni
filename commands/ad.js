const DIG = require('discord-image-generation')

const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
	name: 'ad',
	description: 'Create Ad Image',
	cooldown: 1,
	guildOnly: true,
	async execute(message, args) {
		
		try {

			const user = getUserFromMention(args[0], message) || message.author

			const image = await new DIG.Ad().getImage(user.displayAvatarURL({ dynamic: false, format: 'png' }))

			let attachment = new MessageAttachment(image, 'ad.png')

			message.channel.send(attachment)

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

function getUserFromMention(mention, message) {
	if (!mention) return

	mention = mention.replace('&', '!')

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1)

		if (mention.startsWith('!')) {
			mention = mention.slice(1)
		}

		return message.client.users.cache.get(mention)

	}
}