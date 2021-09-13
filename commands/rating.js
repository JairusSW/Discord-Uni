const ChessAPI = require('chess-web-api')
const api = new ChessAPI()
const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
	name: 'rating',
	description: 'Get chess.com user rating',
	cooldown: 1,
	guildOnly: true,
	async execute(message, args) {
		try {
const Avatar = await api.getPlayer(args.join(' '))

            const avatar = Avatar['body']['avatar']

            const stats = await api.getPlayerStats(args.join(' '))

            const embed = new MessageEmbed()

            const bulletRecord = stats['body']['chess_bullet']['record']

            const blitzRecord = stats['body']['chess_blitz']['record']

            const rapidRecord = stats['body']['chess_rapid']['record']

            const getStats = async () => {

                return [[bulletRecord['win'], bulletRecord['loss'], bulletRecord['draw']], [blitzRecord['win'], blitzRecord['loss'], blitzRecord['draw']], [rapidRecord['win'], rapidRecord['loss'], rapidRecord['draw']]]

            }

            getStats().then(stat => {

                embed.setDescription(`**\nBullet:\n**\nWin: ${stat[0][0]}\n\nLose: ${stat[0][1]}**\n\nBlitz:\n**\nWin: ${stat[1][0]}\n\nLose: ${stat[1][1]}**\n\nRapid:\n**\nWin: ${stat[2][0]}\n\nLose: ${stat[2][1]}`)

                embed.setThumbnail(avatar)

                embed.setColor('#ff5050')

                embed.setTimestamp()

                embed.setFooter(message.author.username)

                message.channel.send(embed)
						})
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