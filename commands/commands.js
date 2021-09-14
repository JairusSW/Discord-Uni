const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'commands',
	description: 'Get the bot\'s commands',
	guildOnly: true,
	cooldown: 3,
	async execute(message, args, config) {

		const commands = new MessageEmbed()
			.setTitle(`Commands`)
			.setDescription(`Usage: ${process.env.prefix}[command-here]\nSelect 1-5`)
			.addField('1. ', 'Leveling')
			.addField('2. ', 'Music')
			.addField('3. ', 'Games')
			.addField('4. ', 'Random')
			.addField('5. ', 'Image')
			.addField('6. ', 'Chess')
			.addField('7. ', 'Chatbot')
			.setColor('#ff5050')
			.setTimestamp()
			.setFooter(message.author.username)

		message.channel.send(commands)

		const filter = m => message.author.id == m.author.id;

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
						.addField('Coinflip [Amount]', 'Gamble your xp')
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
						.addField('Joke', 'Get A Joke')
						.addField('Poll', 'Create a poll')
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

				if (msg === '5') {

					const embed = new MessageEmbed()
						.setTitle(`Image Commands`)
						.addField('Bed [user]', '"Monster under the bed" meme')
						.addField('Facepalm [user]', 'Facepalm Image')
						.addField('Slap [user]', 'Slap Someone')
						.addField('Ad [user]', 'Turn Someone Into A Billboard')
						.addField('Frame [user]', 'Weird Picture Frame Comic')
						.addField('Bob-ross [user]', 'Get Bob Ross To Paint Someone')
						.addField('Trash [user]', 'Throw someone in the trash')
						.addField('Podium [user] [user]', 'Create A Podium (1st, 2nd, 3rd)')
						.addField('RIP [user]', 'Make someone a funeral')
						.addField('Spank [user]', 'Spank someone like a dad')
						.addField('Wanted [user]', 'Dead or alive wanted poster')
						.addField('Triggered [user]', 'Triggered gif')
						.addField('Invert [user]', 'Invert a user\'s avatar')
						.addField('Hitler [user]', 'Worse than hitler news report')
						.addField('Jail [user]', 'Put someone in jail')
						.addField('Junk [user]', 'Turn someone into trash')
						.addField('Karaba [user]', 'Make a karaba')
						.addField('Kiss [user]', 'Kiss someone')
						.addField('Putin [user]', 'Spy on putin')
						.addField('Tatoo [user]', 'Ultimate Tatoo comic')
						.addField('Thomas [user]', 'Turn someone into Thomas the Tank Engine')
						.setColor('#ff5050')
						.setTimestamp()
						.setFooter(message.author.username)

					message.channel.send(embed)

					return

				}

				if (msg === '6') {

					const embed = new MessageEmbed()
						.setTitle(`Chess Commands`)
						.setColor('#ff5050')
						.addField('puzzle', 'Get the chess.com daily puzzle')
						.addField('rating', 'Get your chess.com rating')
						.setTimestamp()
						.setFooter(message.author.username)

					message.channel.send(embed)

					return

				}

				if (msg === '7') {

					const embed = new MessageEmbed()
						.setTitle(`Chatbot Commands`)
						.setColor('#ff5050')
						.addField('Chat', 'Have a conversation with the bot')
						.addField('Stop', 'Stop conversation')
						.setTimestamp()
						.setFooter(message.author.username)

					message.channel.send(embed)

					return

				}

			})

	}
}