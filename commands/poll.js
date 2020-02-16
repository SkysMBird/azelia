const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {

    let banReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("Vous n'avez pas la permission pour faire cela !")
    }
    if(!args[0]) return message.channel.send('Syntaxe: <prefix>poll question')

    const pollEmbed = new Discord.RichEmbed()
        .setTitle(`Sondage crée par ${message.author.username}`)
        .setColor('#dc143c')
        .setFooter('Appuyer sur les réactions ci-dessous.')
        .setDescription(args.join(' '));

    let msg = await message.channel.send(pollEmbed)
    await msg.react('✅')
    await msg.react('❌')
};

module.exports.help = {
    name: "poll"
}