const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'messageReactionAdd',
  on: true,
  async execute(reaction, user, client) {
    const message = reaction.message;

    if (reaction.emoji.name !== "⭐") return;

		console.log('Found a reaction!', reaction)

    //if (message.author.id === user.id) return;

    if (message.author.bot) return;

    const starboardChannel = 'starboard'

    const starChannel = message.guild.channels.cache.find(
      (channel) => channel.name === starboardChannel
    );

    if (!starChannel) return;

    const fetchedMessages = await starChannel.messages.fetch({ limit: 100 });

    const stars = fetchedMessages.find(
      (m) =>
        m.embeds[0].footer.text.startsWith("⭐") &&
        m.embeds[0].footer.text.endsWith(message.id)
    );

    if (stars) {
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
        stars.embeds[0].footer.text
      );

      const foundStar = stars.embeds[0];

      const image =
        message.attachments.size > 0
          ? await extension(reaction, message.attachments.array()[0].url)
          : "";

      const embed = new MessageEmbed()
        .setColor("#ff5050")
				.addField('Author', message.author.username, true)
				.addField('Message', foundStar.description, true)
				.addField('Channel', `#${message.channel.name}`, true)
				.setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: false }))
        .setTimestamp()
        .setFooter(`⭐ ${parseInt(star[1]) + 1}`)
        .setImage(image);

      const starMsg = await starChannel.messages.fetch(stars.id);

      await starMsg.edit(embed);
    }

    if (!stars) {
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
        .setFooter(`⭐ 1`)
        .setImage(image);
      await starChannel.send(embed);
    }
  },
};

function extension(reaction, attachment) {
  const imageLink = attachment.split(".");
  const typeOfImage = imageLink[imageLink.length - 1];
  const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
  if (!image) return "";
  return attachment;
}
