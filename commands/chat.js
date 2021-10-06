const { MessageEmbed } = require('discord.js')

const cleverbot = require("cleverbot-free");

module.exports = {
    name: 'chat',
    description: 'Start a cleverbot instance',
		guildOnly: false,
    cooldown: 0/*(60 * 60) * 24*/,
    async execute(message, args) {
			let stopped = false
			try {
			message.channel.send(`Hey, I'm ${message.client.user.username}! Chat anything and we can start a conversation!`)
			message.client.on('message', async (msg) => {
				if (msg.content == `${process.env.prefix}stop`) stopped = true
				if (stopped === true) return
				if (msg.author.id !== message.author.id) return
				if (msg.author.bot) return
				console.log('got message: ' + msg)
				const response = await cleverbot(msg.content)
				console.log('response: ' + response)
				msg.channel.send(response)
			})
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