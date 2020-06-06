client.on('raw', event => {
    const eventName = event.t;
    if(eventName === 'MESSAGE_REACTION_ADD')
    {
        if(event.d.message_id === '653549607825178644')
        {
            var reactionChannel = client.channels.get(event.d.channel_id);
            if(reactionChannel.messages.has(event.d.message_id))
                return;
            else {
                reactionChannel.fetchMessage(event.d.message_id)
                .then(msg => {
                    var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                    var user = client.users.get(event.d.user_id);
                    client.emit('messageReactionAdd', msgReaction, user)
                })
                .catch(err => console.log(err));
            }
        }
    }
    else if(eventName === 'MESSAGE_REACTION_REMOVE')
    {
        if(event.d.message_id === '653549607825178644')
        {
            var reactionChannel = client.channels.get(event.d.channel_id);
            if(reactionChannel.messages.has(event.d.message_id))
                return;
            else {
                reactionChannel.fetchMessage(event.d.message_id)
                .then(msg => {
                    var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                    var user = client.users.get(event.d.user_id);
                    client.emit('messageReactionRemove', msgReaction, user)
                })
                .catch(err => console.log(err));
            }
        }
    }
})

client.on('messageReactionAdd', (messageReaction, user) => {

    var roleName = messageReaction.emoji.name
    var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === 
    roleName.toLowerCase())

    if(role)
    {
        var member = messageReaction.message.guild.members.find(member => member.id === user.id)
        if(member)
        {
            member.addRole(role.id);
            console.log("Role Ajouté")
        }
    }
})
client.on('messageReactionRemove', (messageReaction, user) => {

    var roleName = messageReaction.emoji.name
    var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === 
    roleName.toLowerCase())

    if(role)
    {
        var member = messageReaction.message.guild.members.find(member => member.id === user.id)
        if(member)
        {
            member.removeRole(role.id);
            console.log("Role Supprimé")
        }
    }
})
