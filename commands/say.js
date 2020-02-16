const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous avez pas la permission")
    if(!args[0] || args[0 == "help"]) return message.reply("Syntaxe: !clear <entrer le nombre de message à supprimer>");

    let messageToBot = args.join(' ');
    message.delete().catch();
    message.channel.send(messageToBot)


};

module.exports.help = {
    name: "say"
}