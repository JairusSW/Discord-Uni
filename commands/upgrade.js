const { MessageEmbed } = require('discord.js')

const { formatNumber } = require('../util/util')

const monsterManager = require('../util/monster')

const monsters = require('../data/monsters.json')

const abilities = require('../data/abilities.json')

const coins = require('../data/coins.json')

module.exports = {
    name: 'upgrade',
    description: 'Upgrade Current Monster',
    usage: '',
    guildOnly: true,
    cooldown: 5,
    async execute(message, args) {
        
        const monsterData = new monsterManager(message.client.db)

        const data = await monsterData.ensureUser(`${message.author.id}`)

        const level = data['monsters'][data['monster']]['level']
        
        const price =  monsters[data['monster']]['levels'][level - 1] * 1000 

        const amountPrompt = new MessageEmbed()
        .setTitle(`Upgrade Cost: ${await formatNumber(price)}xp`)
        .setDescription('[yes/no]')
        .setColor('#ff5050')
        .setTimestamp()
        .setFooter(message.author.username)

        message.channel.send(amountPrompt)

        const filter = m => message.author.id === m.author.id;
		
        try {

            const messages = await message.channel.awaitMessages(filter, { time: 5000, max: 1, errors: ['time'] })

            const avaliable = ['yes', 'no']
    
            if (!avaliable.includes(messages.first().content.toLowerCase().trim())) {
                
                const invalid_response = new MessageEmbed()
                .setTitle('Invalid Response')
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
    
                message.channel.send(invalid_response)
                
                return
    
            }

            if (messages.first().content.toLowerCase().trim() === 'no') {

                const no = new MessageEmbed()
                .setTitle('Upgrade Cancelled')
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
    
                message.channel.send(no)
    
                return

            }

        } catch {

            const invalid_response = new MessageEmbed()
            .setTitle('Invalid Response')
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(invalid_response)

            return

        }

        if (price >= data['xp']) {

            const notEnough = new MessageEmbed()
            .setTitle(`Not Enough XP`)
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)
    
            message.channel.send(notEnough)

            return

        }

        if (level >= 5) {
  
            const monsterMax = new MessageEmbed()
            .setTitle(`Monster Is Maxxed Out`)
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(monsterMax)

            return

        }

        await monsterData.addMonster(`${message.author.id}`, data['monster'], level + 1)

        await monsterData.removeXP(`${message.author.id}`, price)

        const up = await monsterData.ensureUser(`${message.author.id}`)

        const upgraded = new MessageEmbed()
        .setTitle(`Upgraded ${data['monster']}`)
        .addField('Name', up['monster'], true)
        .addField('Level', `${up['monsters'][up['monster']]['level']}`, true)
        .addField('Power', `${up['monsters'][up['monster']]['xp']}/${monsters[up['monster']]['xp']}`, true)
        .addField('Habitat', `${monsters[up['monster']]['habitat']}`, true)
        .addField('Attack', `${monsters[up['monster']]['attack']}/100`, true)
        .addField('Defense', `${monsters[up['monster']]['defense']}/100`, true)
        .addField('Agility', `${monsters[up['monster']]['agility']}/100`, true)
        .addField('Danger', `${monsters[up['monster']]['danger']}/100`, true)
        .addField('Fear', `${monsters[up['monster']]['fear']}/100`, true)
				.setImage(monsters[up['monster']]['url'])
        .setColor('#ff5050')
        .setTimestamp()
        .setFooter(message.author.username)

        message.channel.send(upgraded)

        return

    }
}