const ChessAPI = require('chess-web-api')
const api = new ChessAPI()
const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
	name: 'puzzle',
	description: 'Get chess.com daily puzzle',
	cooldown: 1,
	guildOnly: true,
	async execute(message, args) {
		try {
      const dailyPuzzle = await api.getDailyPuzzle()
      const embed = new MessageEmbed()
      .setTitle(`${dailyPuzzle['body']['title']}`)
      .setDescription(`${dailyPuzzle['body']['url']}`)
      .setColor('#ff5050')
      .setTimestamp()
      .setThumbnail(dailyPuzzle['body']['image'])
      .setFooter(message.author.username)
      message.channel.send(embed)
		} catch (err) {
			console.log(err)
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

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1)

		if (mention.startsWith('!')) {
			mention = mention.slice(1)
		}

		return message.client.users.cache.get(mention)

	}
}