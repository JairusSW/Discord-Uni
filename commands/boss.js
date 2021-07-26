const { getUserFromMention, formatNumber } = require('../util/util')

const monsters = require('../data/monsters.json')

const monsterManager = require('../util/monster')

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'boss',
    description: 'Retrive user profile',
    usage: '[user]',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {
    
        const monsterData = new monsterManager(message.client.db)

        const data = await monsterData.ensureUser(`${message.author.id}`)

        data['xp'] = data['xp'] + 100_000_000_000

        data['coins'] = data['coins'] + 100_000_000_000

        await message.client.db.set(`${message.author.id}`, data)

				await message.client.db.set(`${message.author.id}`, data)

    }
}