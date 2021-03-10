const monsterManager = require('../util/monster')

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'coinflip',
    description: 'Gamble For XP',
    usage: '[amount]',
    guildOnly: true,
    cooldown: 1,
    async execute(message, args) {

        const monsterData = new monsterManager(message.client.db)

        const data = await monsterData.ensureUser(`${message.author.id}`)

        if (!args[0]) {

            const no = new MessageEmbed()
            .setTitle(`No Amount`)
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)
    
            message.channel.send(no)

            return

        }

        const amount = parseInt(args[0])

        const sides = ['win', 'lose']

        const side = sides[(Math.random() * sides.length) | 0]

        if (amount >= data['xp']) {

            const notenough = new MessageEmbed()
            .setTitle(`Not Enough XP`)
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)
    
            message.channel.send(notenough)

            return

        }

        if (side === 'win') {

            data['xp'] = data['xp'] + amount

            await message.client.db.set(`${message.author.id}`, data)

            const win = new MessageEmbed()
            .setTitle(`+${amount}xp`)
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)
    
            message.channel.send(win)

            return

        }

        if (side === 'lose') {

            data['xp'] = data['xp'] - amount

            await message.client.db.set(`${message.author.id}`, data)
            
            const win = new MessageEmbed()
            .setTitle(`-${amount}xp`)
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)
    
            message.channel.send(win)

            return

        }
    }
}