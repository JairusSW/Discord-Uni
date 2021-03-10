const { MessageEmbed } = require('discord.js')

const { formatNumber } = require('../util/util')

const monsters = require('../data/monsters.json')

const abilities = require('../data/abilities.json')

const coins = require('../data/coins.json')

module.exports = {
    name: 'shop',
    description: 'Shop For A Monster Or Item',
    usage: '',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {

        const shop = new MessageEmbed()
        .setTitle(`Store`)
        .addField('1.', 'Monsters')
        .addField('2.', 'Coins')
        .addField('3.', 'Abilities')
        .setColor('#ff5050')
        .setTimestamp()
        .setFooter(message.author.username)

        message.channel.send(shop)

        const filter = m => message.author.id === m.author.id;
		
        message.channel.awaitMessages(filter, { time: 10000, max: 1, errors: ['time'] })
        
			.then(async messages => {
					
                const msg = messages.first().content

                if (msg.trim() === '1') {

                    const monsterList = new MessageEmbed()
                    .setTitle(`Monsters`)
                    .setDescription('>buy [monster]')
                    .setColor('#ff5050')
                    .setTimestamp()
                    .setFooter(message.author.username)
            
                    for (const monster of Object.keys(monsters)) {

                        const price = await formatNumber(monsters[monster]['price'])

                        monsterList.addField(monster, `${price}xp`)

                    }

                    message.channel.send(monsterList)

                }

                if (msg.trim() === '2') {

                    const coinList = new MessageEmbed()
                    .setTitle(`Coins`)
                    .setDescription('>buy [amount]')
                    .setColor('#ff5050')
                    .setTimestamp()
                    .setFooter(message.author.username)

                    for (const i of Object.entries(coins)) {

                        const coins1 = i[0]

                        const xp1 = i[1]

                        const price = await formatNumber(xp1.toString())

                        coinList.addField(coins1, `${price}xp`)

                    }

                    message.channel.send(coinList)

                }

                if (msg.trim() === '3') {

                    const abilitList = new MessageEmbed()
                    .setTitle(`Abilities`)
                    .setDescription('>buy [ability]')
                    .setColor('#ff5050')
                    .setTimestamp()
                    .setFooter(message.author.username)

                    for (const [ability, abe] of Object.entries(abilities)) {

                        const price = await formatNumber(abe['cost'])

                        const bonus = abe['bonus']

                        const name = abe['name']

                        abilitList.addField(name, `+${bonus}\n${price}c`)

                    }

                    message.channel.send(abilitList)

                }

            }).catch(() => {

                const no = new MessageEmbed()
                .setTitle('Selection Cancelled')
                .setColor('#ff5050')
                .setTimestamp()
                .setFooter(message.author.username)
    
                message.channel.send(no)
    
                return

            })

    }
}