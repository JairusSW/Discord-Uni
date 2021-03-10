const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'server-info',
    description: 'Get Conplete Server Information',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {

        const embed = new MessageEmbed()
        .setTitle('Server Info')
        .addField('Name', message.guild.name, true)
        .addField('ID', message.guild.id, true)
        .addField('Region', message.guild.region.toUpperCase(), true)
        .addField('Creation Date', message.guild.createdAt.toDateString(), true)
        .addField('Owner', message.guild.owner.user.tag, true)
        .addField('Members', message.guild.memberCount, true)
        .addField('Roles', message.guild.roles.cache.map(role => role.toString()).join(' **\n** '), true)
        .addField('Channels', message.guild.channels.cache.filter(channel => channel.type !== 'category').map(channel => channel.toString()).join(' **\n** '), true)
        .addField('Categories', message.guild.channels.cache.filter(channel => channel.type === 'category').map(category => category.toString()).join(' **\n** '), true)
        .setColor('#ff5050')
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .setFooter(message.author.username)

        message.channel.send(embed)

        return

    }
}