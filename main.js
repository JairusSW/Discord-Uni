require('dotenv').config()

const chalk = require('chalk')

const formatNumber = require('./util/formatViews')

const ms = require('ms')

const { readdirSync } = require('fs')

const { join } = require('path')

const MusicClient = require('./Client')

const songLength = require('./util/songLength')

const needle = require('needle')

const { Collection, MessageEmbed, MessageAttachment, Intents } = require('discord.js')

const { promisify } = require('util')

const intents = new Intents([
	Intents.NON_PRIVILEGED,
	"GUILD_MEMBERS"
])

const client = new MusicClient({ ws: intents })

const eventFiles = readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args), client);
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

const config = {
	prefix: process.env.prefix,
	token: process.env.token,
	invite: process.env.invite,
	id: process.env.id,
	youtube: new Map(),
	fights: new Map()
}

client.config = config

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {

	const command = require(join(__dirname, 'commands', `${file}`))

	client.commands.set(command.name, command)

}

client.on('messageReactionAdd', async (reaction, user) => {

	if (reaction.partial) {

		try {

			await reaction.fetch()

		} catch (err) {

		}
	}

	let controlPanelEdit

	let song

	if (client.queue.has(user.id)) {

		const userQueue = client.queue.get(user.id)

		if (reaction.emoji.name) {

			const emojis = ['▶', '⏸', '⏪', '⏩', '🔄', '🔀', '🔊', '🔉', '🔈']

			if (emojis.includes(reaction.emoji.name)) {

				if (reaction.emoji.name === '▶') {

					if (userQueue.playing === false) {

						userQueue.connection.dispatcher.resume()

						userQueue.playing = true

					}

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
						.setTitle(`Song Dashboard`)
						.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
						.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
						.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
						.addField(`Volume`, `${userQueue.volume * 10}`)
						.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
						.setThumbnail(`${song.thumbnail}`)
						.setColor('#ff5050')
						.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '⏸') {

					if (userQueue.playing === true) {

						userQueue.connection.dispatcher.pause()

						userQueue.playing = false

					}

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
						.setTitle(`Song Dashboard`)
						.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
						.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
						.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
						.addField(`Volume`, `${userQueue.volume * 10}`)
						.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
						.setThumbnail(`${song.thumbnail}`)
						.setColor('#ff5050')
						.setFooter(`----------------------------------------------------------------------------------------------`)


					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '⏩') {

					userQueue.connection.dispatcher.end()

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
						.setTitle(`Song Dashboard`)
						.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
						.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
						.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
						.addField(`Volume`, `${userQueue.volume * 10}`)
						.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
						.setThumbnail(`${song.thumbnail}`)
						.setColor('#ff5050')
						.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '⏪') {

					userQueue.location = userQueue.location - 2

					userQueue.connection.dispatcher.end()

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
						.setTitle(`Song Dashboard`)
						.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
						.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
						.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
						.addField(`Volume`, `${userQueue.volume * 10}`)
						.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
						.setThumbnail(`${song.thumbnail}`)
						.setColor('#ff5050')
						.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '🔄') {

					userQueue.loop ? userQueue.loop = false : userQueue.loop = true

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
						.setTitle(`Song Dashboard`)
						.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
						.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
						.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
						.addField(`Volume`, `${userQueue.volume * 10}`)
						.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
						.setThumbnail(`${song.thumbnail}`)
						.setColor('#ff5050')
						.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '🔀') {

					userQueue.shuffle ? userQueue.shuffle = false : userQueue.shuffle = true

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
						.setTitle(`Song Dashboard`)
						.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
						.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
						.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
						.addField(`Volume`, `${userQueue.volume * 10}`)
						.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
						.setThumbnail(`${song.thumbnail}`)
						.setColor('#ff5050')
						.setFooter(`----------------------------------------------------------------------------------------------`)
					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '🔊') {

					userQueue.volume = userQueue.volume + 1

					userQueue.connection.dispatcher.setVolumeLogarithmic(userQueue.volume / 5)

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
						.setTitle(`Song Dashboard`)
						.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
						.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
						.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
						.addField(`Volume`, `${userQueue.volume * 10}`)
						.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
						.setThumbnail(`${song.thumbnail}`)
						.setColor('#ff5050')
						.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '🔉') {

					userQueue.volume = userQueue.volume - 1

					userQueue.connection.dispatcher.setVolumeLogarithmic(userQueue.volume / 5)

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
						.setTitle(`Song Dashboard`)
						.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
						.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
						.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
						.addField(`Volume`, `${userQueue.volume * 10}`)
						.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
						.setThumbnail(`${song.thumbnail}`)
						.setColor('#ff5050')
						.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '🔈') {

					if (userQueue.mute === true) {

						userQueue.mute = false

						userQueue.connection.dispatcher.setVolumeLogarithmic(userQueue.volume / 5)

					}

					if (userQueue.mute === false) {

						userQueue.mute = true

						userQueue.connection.dispatcher.setVolumeLogarithmic(0 / 5)

					}

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
						.setTitle(`Song Dashboard`)
						.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
						.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
						.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
						.addField(`Volume`, `${userQueue.volume * 10}`)
						.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
						.setThumbnail(`${song.thumbnail}`)
						.setColor('#ff5050')
						.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

			}

		}

	}

})

client.once('ready', () => {

	console.log(chalk.bold.blue(`Username: ${client.user.tag}`))

	console.log(chalk.bold.blue(`Servers: ${formatNumber(client.guilds.cache.size)}`))

	console.log(chalk.bold.blue(`Users: ${formatNumber(client.guilds.cache.reduce((a, g) => a + g.memberCount, 0))}`))

	console.log(chalk.bold.blue(`Channels: ${formatNumber(client.channels.cache.size)}`))

	client.user.setActivity('Awesome', { type: 'LISTENING' })

})

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

client.on('message', message => {

	if (message.author.bot) return
	
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.prefix)})\\s*`)

	if (!prefixRegex.test(message.content)) return

	let [, matchedPrefix] = message.content.match(prefixRegex)

	matchedPrefix = matchedPrefix.trim()

	const prefixes = [client.prefix, `<@!${client.user.id}>`]

	if (prefixes.includes(matchedPrefix) === false) return

	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)

	const commandName = args.shift().toLowerCase()

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return

	if (command.guildOnly && message.channel.type !== 'text') {

		const serverOnly = new MessageEmbed()
			.setTitle(`Please Move To A Server.`)
			.setColor('#ff5050')
			.setTimestamp()
			.setFooter(message.author.username)

		message.channel.send(serverOnly)

		return

	}

	if (command.args && !args.length) {

		const noArgs = new MessageEmbed()
			.setTitle(`Please Provide The Needed Input.`)
			.setColor('#ff5050')
			.setTimestamp()
			.setFooter(message.author.username)

		message.channel.send(noArgs)

		return

	}

	if (!client.cooldowns.has(command.name)) {

		client.cooldowns.set(command.name, new Collection())

	}

	const now = Date.now()

	const timestamps = client.cooldowns.get(command.name)

	const cooldownAmount = (command.cooldown || 3) * 1000

	if (timestamps.has(message.author.id) && message.author.id.toString() !== process.env.ownerId.toString()) {

		const expirationTime = timestamps.get(message.author.id) + cooldownAmount

		if (now < expirationTime) {

			const timeLeft = (expirationTime - now)

			const slowDown = new MessageEmbed()
				.setTitle(`Slow Down. ${ms(timeLeft | 0)} Left.`)
				.setColor('#ff5050')
				.setTimestamp()
				.setFooter(message.author.username)

			message.channel.send(slowDown)

			return

		}

	}

	timestamps.set(message.author.id, now)

	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

	try {

		command.execute(message, args)

	} catch (err) {

		const errorMessage = new MessageEmbed()
			.setTitle(`Something Happened. Try Again.`)
			.setColor('#ff5050')
			.setTimestamp()
			.setFooter(message.author.username)

		message.channel.send(errorMessage)

	}

})

client.login(process.env.token)

const http = require('http')

const server = http.createServer((req, res) => {

	res.writeHead(200)

	res.end('ok')

})

server.on('error', () => {

	return

})

server.listen(3000)

process.on('unhandledRejection', (err) => console.log('Unhandled Rejection Error: ', err))