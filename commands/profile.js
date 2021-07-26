const { getUserFromMention, formatNumber } = require('../util/util')

const monsters = require('../data/monsters.json')

const monsterManager = require('../util/monster')

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'profile',
    description: 'Retrive user profile',
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
                .setTitle(`Profile`)
                .addField('XP', `${await formatNumber(userData['xp'])}xp`, true)
                .addField('Coins', `${await formatNumber(userData['coins'])}c`, true)
                .addField('Wins', `${await formatNumber(userData['win'])}`, true)
                .addField('Lose', `${await formatNumber(userData['lose'])}`, true)
                .addField('Level', `${userData['monsters'][userData['monster']]['level']}`, true)
                .addField('Power', `${userData['monsters'][userData['monster']]['xp']}/${monsters[userData['monster']]['xp']}`, true)
                .addField('Habitat', `${monsters[userData['monster']]['habitat']}`)
                .addField('Attack', `${monsters[userData['monster']]['attack']}/100`, true)
                .addField('Defense', `${monsters[userData['monster']]['defense']}/100`, true)
                .addField('Agility', `${monsters[userData['monster']]['agility']}/100`, true)
                .addField('Danger', `${monsters[userData['monster']]['danger']}/100`, true)
                .addField('Fear', `${monsters[userData['monster']]['fear']}/100`, true)
                .addField('Abilities', `${Object.keys(userData['monsters'][userData['monster']]['abilities']).length}`)
                .setThumbnail(userData['avatar'])
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)

            return message.channel.send(users)

        }

        const authors = new MessageEmbed()
            .setTitle(`Profile`)
            .addField('XP', `${await formatNumber(data['xp'])}xp`, true)
            .addField('Coins', `${await formatNumber(data['coins'])}c`, true)
            .addField('Level', `${data['monsters'][data['monster']]['level']}`, true)
            .addField('Power', `${data['monsters'][data['monster']]['xp']}/${monsters[data['monster']]['xp']}`, true)
            .addField('Habitat', `${monsters[data['monster']]['habitat']}`, true)
            .addField('Attack', `${monsters[data['monster']]['attack']}/100`, true)
            .addField('Defense', `${monsters[data['monster']]['defense']}/100`, true)
            .addField('Agility', `${monsters[data['monster']]['agility']}/100`, true)
            .addField('Danger', `${monsters[data['monster']]['danger']}/100`, true)
            .addField('Fear', `${monsters[data['monster']]['fear']}/100`, true)
            .addField('Abilities', `${Object.keys(data['monsters'][data['monster']]['abilities']).length}`)
            .setThumbnail(data['avatar'])
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)


        return message.channel.send(authors)

    }
}