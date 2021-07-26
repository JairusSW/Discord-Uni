const { MessageEmbed } = require('discord.js')

const { formatNumber } = require('../util/util')

const monsterManager = require('../util/monster')

const monsters = require('../data/monsters.json')

const abilities = require('../data/abilities.json')

const coins = require('../data/coins.json')

module.exports = {
    name: 'select',
    description: 'Select Different Monster',
    usage: '',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {

        const monsterData = new monsterManager(message.client.db)

        let data = await monsterData.ensureUser(`${message.author.id}`)

        const monsterEmbed = new MessageEmbed()
        .setTitle(`Monsters`)
        .setColor('#ff5050')
        .setTimestamp()
        .setFooter(message.author.username)

        let i = 0

        const monster = []

        for (const [name, stats] of Object.entries(data['monsters'])) {

            i++

            monsterEmbed.addField(`${i}. ${name}`, `${stats['xp']}/${monsters[data['monster']]['xp']}`)

            monster.push(name)

        }

        monsterEmbed.setDescription(`1-${i}`)

        message.channel.send(monsterEmbed)

        const filter = m => message.author.id === m.author.id;

        message.channel.awaitMessages(filter, { time: 5000, max: 1, errors: ['time'] })
        
        .then(async messages => {
                
            const msg = parseInt(messages.first().content)

            if (msg <= i && msg >= 1) {

                await monsterData.addMonster(`${message.author.id}`, monster[msg - 1], data['monsters'][monster[msg - 1]]['level'])

                data = await monsterData.ensureUser(`${message.author.id}`)

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
                .setImage(monsters[data['monster']['url']])
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)

                return message.channel.send(authors)

            }

            const invalid = new MessageEmbed()
            .setTitle('Invalid Selection')
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(invalid)
            
        }).catch(() => {

            const no = new MessageEmbed()
            .setTitle('Selection Cancelled')
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(no)

            return

        })

        return

    }
}