const { Client, Collection } = require('discord.js')

const Air5 = require('air5')

const ReziDB = require('rezidb')

const database = new ReziDB({
	name: 'Muzuk',
	path: './data',
	cluster: true
})

const leveling = new ReziDB({
	name: 'Levels',
	path: './data',
	cluster: true
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