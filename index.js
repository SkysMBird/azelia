const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();

client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if(err) console.log(err);

    let jsFile = files.filter(f => f.split('.').pop() === 'js');
    if (jsFile.length<= 0) {
        console.log('Je ne trouve pas la commande');
        return;
    }

    jsFile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);
    })
})

client.on('ready', async () => {
    console.log(`${client.user.username} est en ligne`);
    client.user.setActivity(`| Je vous donne des jeux dans #🎮jeux  |`)

})
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
// prefix
if(!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        }
    }

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = client.commands.get(command.slice(prefix.length));
    if (commandFile) commandFile.run(client, message, args)
});

client.on("guildMemberAdd", user => {
    let nouveau = new Discord.RichEmbed()
        .setColor("#36cc14")
        .setAuthor(user.user.username, user.user.displayAvatarURL)
        .setDescription("Bienvenue " + user + " sur La famille d'Azélia ! ")
        .setFooter("La famille d'Azélia ! Enjoy ! 🎉 🎊")
     user.guild.channels.get("678558345455468554").send(nouveau)
     user.addRole("678559659715723296")
     user.addRole("678612734568562690")
     user.createDM().then(channel => {
        channel.send("Hey " + user + " qui que tu sois je te souhaite la bienvenue parmi nous :v:, passe du bon temps sur ce serveur mais n'oublie pas de jeter un coup d’œil sur le channel #règlement du serveur pour être au courant de ce que tu peux faire ou pas !\n \nInvite tes amis grâce à ce lien : https://discord.gg/Kw98C5D\n \nBienvenue sur le serveur " + user + " et bon jeu, enjoy ! :tada: :confetti_ball:")
    })
});

client.on("guildMemberRemove", user =>{
    let leave = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setAuthor(user.user.username, user.user.displayAvatarURL)
        .setDescription("Snifff... " + user + " a quitter La famille :cry:")
        .setFooter(" La famille d'Azélia ")
     user.guild.channels.get("678558345455468554").send(leave)
});


client.login(config.token);