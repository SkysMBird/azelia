const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let reportedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!reportedUser) {
        return message.channel.send("L'utilisateur n'existe pas !");
    }
    let reportedReason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Report")
    .setColor('#dc143c')
    .addField("Utilisateur reporté ", `${reportedUser} (ID: ${reportedUser.id})`)
    .addField("Utilisateur ayant reporté", `${message.author} (ID: ${message.author.id})`)
    .addField("Raison", reportedReason);

    let reportChannel = message.guild.channels.find(`name`, "🔎report");
    if (!reportChannel) {
        return message.channel.send("Le canal 'report est introuvable. Veuillez créer ce canal !")
    }

    message.delete();
    reportChannel.send(reportEmbed)
}

module.exports.help = {
    name: "report"
}