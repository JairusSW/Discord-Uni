const { getUserFromMention, formatNumber } = require('../util/util')

const monsterManager = require('../util/monster')

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'balance',
    description: 'Retrive Balance In XP and Coins',
    usage: '[user]',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {
    
        const monsterData = new monsterManager(message.client.db)

        const data = await monsterData.ensureUser(`${message.author.id}`)

        if (args[0]) {

            const user = getUserFromMention(args[0], message.client)

            if (user == null) {

                const invalid = new MessageEmbed()
                .setTitle('Invalid Mention')
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
        
                return message.channel.send(invalid)

            }

            const userData = await monsterData.ensureUser(`${user.id}`)
    
            const users = new MessageEmbed()
            .setTitle(`Balance:`)
            .addField('XP', `${await formatNumber(userData['xp'])}xp`)
            .addField('Coins', `${await formatNumber(userData['coins'])}c`)
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)
    
            return message.channel.send(users)

        }
    
        const authors = new MessageEmbed()
        .setTitle(`Balance:`)
        .addField('XP', `${await formatNumber(data['xp'])}xp`)
        .addField('Coins', `${await formatNumber(data['coins'])}c`)
        .setColor('#ff5050')
        .setTimestamp()
        .setFooter(message.author.username)

        message.channel.send(authors)

        return

    }
}