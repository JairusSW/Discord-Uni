const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'messageReactionAdd',
    on: true,
    async execute(reaction, user, client) {
        const message = reaction.message;

        if (reaction.emoji.name !== "⭐") return;

        const starboardChannel = 'starboard'

        const starChannel = message.guild.channels.cache.find(
            (channel) => channel.name === starboardChannel
        );

        if (!starChannel) return;

        const image =
            message.attachments.size > 0
                ? extension(reaction, message.attachments.array()[0].url)
                : "";

        if (image === "" && message.cleanContent.length < 1) return;

        const embed = new MessageEmbed()
            .setColor("#ff5050")
            .addField('Author', message.author.username, true)
            .addField('Message', message.cleanContent, true)
            .addField('Channel', `#${message.channel.name}`, true)
            .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: false }))
            .setTimestamp()
            .setFooter(`⭐`)
            .setImage(image);
        await starChannel.send(embed);
    }
};

function extension(reaction, attachment) {
    const imageLink = attachment.split(".");
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return "";
    return attachment;
}
