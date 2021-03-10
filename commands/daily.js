const { MessageEmbed } = require('discord.js')

const monsterManager = require('../util/monster')

module.exports = {
    name: 'daily',
    description: 'Get Daily Reward',
    usage: '',
    guildOnly: true,
    cooldown: 86400,
    async execute(message, args) {

        const monsterData = new monsterManager(message.client.db)

        const data = await monsterData.ensureUser(`${message.author.id}`)

        const bonuses = [243, 280, 221, 314, 361, 352, 482, 462, 490]

        let bonus = bonuses[(Math.random() * bonuses.length) | 0]

        data['xp'] = data['xp'] + bonus + 250

        data['coins'] = data['coins'] + 50

        await message.client.db.set(`${message.author.id}`, data)

        const embed = new MessageEmbed()
        .setTitle(`+${bonus + 250}xp\n+50c`)
        .setColor('#ff5050')
        .setTimestamp()
        .setFooter(message.author.username)

        message.channel.send(embed)

        return

    }
}