const Discord = require('discord.js');


module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous avez pas la permission")
    if(!args[0] || args[0 == "help"]) return message.reply("Syntaxe: !clear <entrer le nombre de message à supprimer>");

    message.channel.bulkDelete(args[0]).then(()=> {
        message.channel.send(`J'ai supprimé ***${args[0]} message*** pour vous !`).then(msg => msg.delete(5000))
    })


};

module.exports.help = {
    name: "clear"
}