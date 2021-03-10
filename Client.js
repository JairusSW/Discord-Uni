const { Client, Collection } = require('discord.js')

const Air5 = require('air5')

const database = new Air5('Muzuk', {
	provider: 'LevelDB'
})

const leveling = new Air5('Levels', {
	provider: 'LevelDB'
})

class MuzukClient extends Client {
	constructor(options) {
		super(options)

		this.commands = new Collection()

		this.cooldowns = new Collection()

		this.prefix = '>'
		
		this.queue = new Map()

		this.userDatabase = database

		this.musicDatabase = database

		this.db = leveling
		
	}
}

module.exports = MuzukClient