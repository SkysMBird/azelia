const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
        let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!bannedUser) {
            return message.channel.send("L'utilisateur n'existe pas !");
        }
        let banReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Vous n'avez pas la permission pour faire cela !")
        }
        if(bannedUser.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Vous ne pouvez pas ban cette personne !")
        }

        let banEmbed = new Discord.RichEmbed()
        .setDescription("Bans")
        .setColor('#dc143c')
        .addField("Utilisateur banni ", `${bannedUser} (ID: ${bannedUser.id})`)
        .addField("Utilisateur ayant ban", `${message.author} (ID: ${message.author.id})`)
        .addField("Raison", banReason);

        let banChannel = message.guild.channels.find(`name`, "📝logs");
        if (!banChannel) {
            return message.channel.send("Le canal '📝logs' est introuvable. Veuillez créer ce canal !")
        }

        message.guild.member(bannedUser).ban(banReason);
        banChannel.send(banEmbed)
}

module.exports.help = {
    name: "ban"
}