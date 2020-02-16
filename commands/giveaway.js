const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    var item = "";
    var time;
    var winnerCount;
 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Désolé, vous ne pouvez pas faire ça");
 
    winnerCount = args[0];
    time = args[1];
    item = args.splice(2, args.length).join(' ');
 
    message.delete();
 
    var date = new Date().getTime();
    var dateTime = new Date(date + (time * 1000));
 
    var giveawayEmbed = new discord.RichEmbed()
        .setTitle("🎉 **GIVEAWAY** 🎉")
        .setFooter(`Temps : ${dateTime}`)
        .setDescription(item);
 
    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");
 
    setTimeout(function () {
 
        var random = 0;
        var winners = [];
        var inList = false;
 
        var peopleReacted = embedSend.reactions.get("🎉").users.array();
 
        for (var i = 0; i < peopleReacted.length; i++) {
            if (peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }
 
        if (peopleReacted.length == 0) {
            return message.channel.send("Personne n'a gagné, donc le bot gagne.");
        }
 
        if (peopleReacted.length < winnerCount) {
            return message.channel.send("Il y a trop peu de personnes qui ont participé, alors le bot a gagné.");
        }
 
        for (var i = 0; i < winnerCount; i++) {
 
            inList = false;
 
            random = Math.floor(Math.random() * peopleReacted.length);
 
            for (var y = 0; y < winners.length; y++) {
                if (winners[y] == peopleReacted[random]) {
                    i--;
                    inList = true;
                    break;
                }
            }
            if (!inList) {
                winners.push(peopleReacted[random]);
            }
 
        }
        for (var i = 0; i < winners.length; i++) {
            message.channel.send("Félicitations " + winners[i] + ` ! Tu as gagné **${item}**.`);
        }
 
    }, 1000 * time);
 
 
}
 
module.exports.help = {
    name: "giveaway",
}