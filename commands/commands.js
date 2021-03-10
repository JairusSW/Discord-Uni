const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'commands',
	description: 'Get the bot\'s commands',
	guildOnly: true,
	cooldown: 3,
	async execute(message, args, config) {

		const commands = new MessageEmbed()
			.setTitle(`Commands`)
			.setDescription('1-5')
			.addField('1. ', 'Leveling')
			.addField('2. ', 'Music')
			.addField('3. ', 'Games')
			.addField('4. ', 'Random')
			.addField('5. ', 'Other')
			.setColor('#ff5050')
			.setTimestamp()
			.setFooter(message.author.username)

		message.channel.send(commands)

		const filter = m => message.author.id === m.author.id;

		message.channel.awaitMessages(filter, { time: 5000, max: 1, errors: ['time'] })

			.then(async messages => {

				const msg = messages.first().content.trim()

				if (msg === '1') {

					const embed = new MessageEmbed()
						.setTitle(`Leveling Commands`)
						.addField('Profile [User]', 'Get User Stats/Power')
						.addField('Monster [User]', 'Get Monster Power And Info')
						.addField('Balance', 'Get User Balance XP/Coins')
						.addField('Shop', 'Get Store')
						.addField('Buy [Item]', 'Buy Item With XP/Coins')
						.addField('Daily', 'Get Daily Bonus')
						.addField('Upgrade', 'Upgrade Current Monster')
						.addField('Select', 'Switch Current Monster')
						.setColor('#ff5050')
						.setTimestamp()
						.setFooter(message.author.username)

					message.channel.send(embed)

					return

				}

				if (msg === '2') {

					const embed = new MessageEmbed()
						.setTitle(`Music Commands`)
						.addField('Play [url/title/code/id]', 'Play A Youtube Song/Playlist Or Playlist Code')
						.addField('Search [title]', 'Search A Youtube/Youtube Music Song')
						.addField('Pause', 'Pause Current Song/Playlist')
						.addField('Resume', 'Resume Current Song/Playlist')
						.addField('Stop', 'Stop All Songs/Playlists')
						.addField('Current', 'View Current Song/Playlist')
						.addField('Shuffle', 'Shuffle On/Off')
						.addField('Loop', 'Loop On/Off')
						.addField('Volume', 'Volume Up/Down/Off')
						.addField('Mute', 'Mute On/Off')
						.addField('Queue', 'View Current Queue')
						.addField('Lyrics', 'View Current Lyrics')
						.addField('Search-Lyrics', 'Search For Lyrics')
						.addField('Skip', 'Skip The Current Song')
						.addField('Back', 'Revert To Previous Song')
						.addField('Save-Queue', 'Save Queue As Muzuk Playlist')
						.addField('View-Playlist [code]', 'View Playlist/Queue')
						.addField('Load-Playlist [code]', 'Load And Play Provided Playlist/Queue')
						.addField('Vote-Playlist [code]', 'Vote For Playlist')
						.addField('My-Playlists', 'View Your Playlists')
						.setColor('#ff5050')
						.setTimestamp()
						.setFooter(message.author.username)

					message.channel.send(embed)

					return

				}

				if (msg === '3') {

					const embed = new MessageEmbed()
						.setTitle(`Game Commands`)
						.addField('Minseweeper [Easy/Medium/Hard]', 'Generate A Minesweeper Field')
						.setColor('#ff5050')
						.setTimestamp()
						.setFooter(message.author.username)

					message.channel.send(embed)

					return

				}

				if (msg === '4') {

					const embed = new MessageEmbed()
						.setTitle(`Random Commands`)
						.addField('Invite', 'Get Bot Invite Link')
						.addField('Ping', 'Get Bot Ping')
						.addField('Server-Info', 'Get Server Info')
						.addField('User-Info', 'Get User Info')
						.addField('Stats', 'Get Bot Stats')
						.addField('Avatar [User]', 'Get User Avatar')
						.addField('Cat-Fact', 'Get Random Cat Fact')
						.addField('Momma', 'Random Yo Momma Joke')
						.setColor('#ff5050')
						.setTimestamp()
						.setFooter(message.author.username)

					message.channel.send(embed)

					return

				}

				if (msg === '5') {

					const embed = new MessageEmbed()
						.setTitle(`Other Commands`)
						.addField('Joke', 'Get A Joke')
						.addField('Advice', 'Get Life Advice')
						.addField('Meme', 'Get Meme')
						.addField('Insult [User]', 'Get Random Insult')
						.addField('8ball [Question]', 'Answer Any Question')
						.addField('Weather [Location/ZIP]', 'Get Current Weather Stats')
						.setColor('#ff5050')
						.setTimestamp()
						.setFooter(message.author.username)

					message.channel.send(embed)

					return

				}

			})

	}
}