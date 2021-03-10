const { MessageEmbed } = require('discord.js')

const { formatNumber } = require('../util/util')

const monsterManager = require('../util/monster')

const monsters = require('../data/monsters.json')

const abilities = require('../data/abilities.json')

const coins = require('../data/coins.json')

module.exports = {
    name: 'buy',
    description: 'Buy A Monster Or Item',
    usage: '[item]',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {

        if (args[0] == null) {

            const noItem = new MessageEmbed()
            .setTitle(`No Item/ability/Monster Provided`)
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)
    
            message.channel.send(noItem)

            return

        }

        let type = null

        const monsterData = new monsterManager(message.client.db)

        await monsterData.ensureUser(`${message.author.id}`)

        const monsterList = []
        
        const coinList = []

        const abilityList = []

        for (const [monster] of Object.entries(monsters)) {

            monsterList.push(monster.toLowerCase())

        }

        for (const [name] of Object.entries(abilities)) {

            abilityList.push(name.toLowerCase())

        }

        for (const [coin] of Object.entries(coins)) {

            coinList.push(coin.replace('c', ''))

        }

        const coin = await formatNumber(parseInt(args.join(' ').trim().replace('c', '')))

        if (monsterList.includes(args[0].toLowerCase().trim())) {

            type = 'monster'

        } else if (coinList.includes(coin)) {

            type = 'coin'

        } else if (abilityList.includes(args.join(' ').trim().toLowerCase()) !== null) {

            type = 'ability'
            
        } else {

            const notMonster = new MessageEmbed()
            .setTitle(`Invalid Item/Ability/Monster`)
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)
    
            message.channel.send(notMonster)

            return

        }

        if (type === 'coin') {

            const coinsToGive = parseInt(coin.replace(',', ''))

            await monsterData.removeXP(message.author.id, coins[`${coin}c`])

            await monsterData.addCoins(message.author.id, coinsToGive)

            const data = await monsterData.ensureUser(`${message.author.id}`)

            const bought = new MessageEmbed()
            .setTitle(`Bought ${coin}c`)
            .addField('Name', data['monster'])
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
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(bought)

            return

        }

        if (type === 'ability') {

            let array1 = args[0].toLowerCase().trim().split('')

            array1[0] = array1[0].toUpperCase()
            
            array1 = array1.join('')
            
            let array2 = args[1].toLowerCase().trim().split('')

            array2[0] = array2[0].toUpperCase()
            
            array2 = array2.join('')
            
            const item = `${array1} ${array2}`

            const Data = await monsterData.ensureUser(`${message.author.id}`)

            if (Data['coins'] <= abilities[item]['cost']) {

                const own = new MessageEmbed()
                .setTitle(`Not Enough Coins`)
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
        
                message.channel.send(own)

                return

            }

            if (!(Data['monsters'][Data['monster']]['abilities'][item] == null)) {

                const own = new MessageEmbed()
                .setTitle(`Already Own ${item}`)
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
        
                message.channel.send(own)

                return

            }

            await monsterData.addAbility(`${message.author.id}`, item)

            await monsterData.removeCoins(`${message.author.id}`, abilities[item]['cost'])

            const data = await monsterData.ensureUser(`${message.author.id}`)

            const bought = new MessageEmbed()
            .setTitle(`Bought ${item}`)
            .addField('Name', data['monster'])
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
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(bought)

        }

        if (type === 'monster') {

            let array = args[0].toLowerCase().trim().split('')

            array[0] = array[0].toUpperCase()
            
            array = array.join('')
            
            const monster = array

            if (monsters[monster] == null) {

                const notMonster = new MessageEmbed()
                .setTitle(`Invalid Item/Monster`)
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
        
                message.channel.send(notMonster)

                return

            }

            if (await monsterData.getXP(`${message.author.id}`) <= monsters[monster]['price']) {

                const notEnough = new MessageEmbed()
                .setTitle(`Not Enough XP`)
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
        
                message.channel.send(notEnough)

                return

            }

            const userMonsters = await monsterData.getMonsters(`${message.author.id}`)

            if (userMonsters[monster]) {

                const alreadyBought = new MessageEmbed()
                .setTitle(`Already Own ${monster}`)
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
        
                message.channel.send(alreadyBought)

                return
        
            }

            await monsterData.addMonster(`${message.author.id}`, monster, 1)

            const data = await monsterData.ensureUser(`${message.author.id}`)

            const bought = new MessageEmbed()
            .setTitle(`Bought ${monster}`)
            .addField('Name', data['monster'])
            .addField('Power', `${data['monsters'][data['monster']]['xp']}/${monsters[data['monster']]['xp']}`)
            .addField('Habitat', `${monsters[data['monster']]['habitat']}`)
            .addField('Attack', `${monsters[data['monster']]['attack']}/100`)
            .addField('Defense', `${monsters[data['monster']]['defense']}/100`)
            .addField('Agility', `${monsters[data['monster']]['agility']}/100`)
            .addField('Danger', `${monsters[data['monster']]['danger']}/100`)
            .addField('Abilities', `${Object.keys(data['monsters'][data['monster']]['abilities']).length}`)
            .addField('Fear', `${monsters[data['monster']]['fear']}/100`)
            .addField('XP', `${await formatNumber(data['xp'])}xp`)
            .addField('Coins', `${await formatNumber(data['coins'])}c`)
            .setColor('#ff5050')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(bought)

            return

        }

    }
}