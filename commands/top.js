const { getUserFromMention, formatNumber } = require('../util/util')

const monsterManager = require('../util/monster')

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'top',
    description: 'Retrive Balance In XP and Coins',
    usage: '[user]',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {
    
        const monsterData = new monsterManager(message.client.db)

        monsterData.addXP(message.author.id, 100000000)

    }
}