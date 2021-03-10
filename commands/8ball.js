const { MessageEmbed } = require('discord.js')

module.exports = {
    name: '8ball',
    description: 'Gives A Magical 8Ball Response',
    usage: '[question]',
    guildOnly: true,
    cooldown: 1,
    async execute(message, args) {

        const balls = [
            'Yes, always.',
            'Possibly not.',
            'Who knows?',
            'Why would anyone care?',
            'Look to the gods.',
            'You may rely on it.',
            'The Oracle says so.',
            'Without a doubt.',
            'It is decidedly so.',
            'It is certain.',
            'Most likely.',
            'Possibly.',
            'Mabye.',
            'Quite possible.',
            'Ask Zeus.',
            'My sources say no.',
            'The Oracle disagrees.',
            'The gods say no.',
            'The gods are uncertain.',
            'Very doubtful.',
            'No way.',
            'Buy a fortune cookie.',
            'The answer is hiding inside you',
            'You may rely on it.',
            'Open the fortune cookie.',
            'The fortune cookie demands it.',
            'Find it in yourself.',
            'You decide.',
            'Who Cares?'
        ]

        const ball = balls[(Math.random() * balls.length) | 0]

        const embed = new MessageEmbed()
        .setTitle(`${message.author.username}, ${ball}`)
        .setColor('#ff5050')
        .setTimestamp()
        .setFooter(message.author.username)

        message.channel.send(embed)

        return
        
    }
}