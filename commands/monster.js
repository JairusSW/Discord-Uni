const { formatNumber } = require('../util/util')

const { MessageEmbed } = require('discord.js')

const { getUserFromMention } = require('../util/util')

const monsterManager = require('../util/monster')

const monsters = require('../data/monsters.json')

const abilities = require('../data/abilities.json')

const coins = require('../data/coins.json')

module.exports = {
    name: 'monster',
    description: 'Display Current Monster Info',
    usage: '[user]',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {

        const monsterData = new monsterManager(message.client.db)

        await monsterData.ensureUser(`${message.author.id}`)

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
            .setTitle(`${userData['monster']}`)
            .addField('Name', userData['monster'])
            .addField('Power', `${userData['monsters'][userData['monster']]['xp']}/${monsters[userData['monster']]['xp']}`)
            .addField('Habitat', `${monsters[userData['monster']]['habitat']}`)
            .addField('Attack', `${monsters[userData['monster']]['attack']}/100`)
            .addField('Defense', `${monsters[userData['monster']]['defense']}/100`)
            .addField('Agility', `${monsters[userData['monster']]['agility']}/100`)
            .addField('Danger', `${monsters[userData['monster']]['danger']}/100`)
            .addField('Fear', `${monsters[userData['monster']]['fear']}/100`)
            .addField('Abilities', `${Object.keys(userData['monsters'][userData['monster']]['abilities']).length}`)
            .addField('XP', `${await formatNumber(userData['xp'])}xp`)
            .addField('Coins', `${await formatNumber(userData['coins'])}c`)
            .setColor('#ff5050')
            .setImage(userData['avatar'])
    
            return message.channel.send(users)

        }

        const data = await monsterData.ensureUser(`${message.author.id}`)

        const authors = new MessageEmbed()
        .setTitle(`${data['monster']}`)
        .addField('Name', data['monster'])
        .addField('Level', `${data['monsters'][data['monster']]['level']}`)
        .addField('Power', `${data['monsters'][data['monster']]['xp']}/${monsters[data['monster']]['xp']}`)
        .addField('Habitat', `${monsters[data['monster']]['habitat']}`)
        .addField('Attack', `${monsters[data['monster']]['attack']}/100`)
        .addField('Defense', `${monsters[data['monster']]['defense']}/100`)
        .addField('Agility', `${monsters[data['monster']]['agility']}/100`)
        .addField('Danger', `${monsters[data['monster']]['danger']}/100`)
        .addField('Fear', `${monsters[data['monster']]['fear']}/100`)
        .addField('Abilities', `${Object.keys(data['monsters'][data['monster']]['abilities']).length}`)
        .addField('XP', `${await formatNumber(data['xp'])}xp`)
        .addField('Coins', `${await formatNumber(data['coins'])}c`)
        .setImage(data['avatar'])
        .setColor('#ff5050')
        .setTimestamp()
        .setFooter(message.author.username)

        return message.channel.send(authors)
    }
}