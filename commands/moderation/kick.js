
module.exports = {
    name: 'kick',
    description: 'kicks',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const {
            Permissions
        } = require('discord.js');
        const {
            MessageEmbed
        } = require('discord.js');

        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return message.channel.send("you have no permissions to do this.");
        }
        if (args[0]) {
            if (args[1]) {
                    mem = message.mentions.members.first();
                    if (!mem || mem == undefined) {
                        message.channel.send("Member not found.");
                        return;
                    } else {
                        mem.kick(args[1]);
                        const em = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('User Successfully Kicked')
                        .setAuthor({
                            name: message.author.username
                        })
                        .addFields({
                                name: 'Admin Name: ',
                                value: message.author.username.toString()
                            }, {
                                name: 'Kicked User Name: ',
                                value: mem.user.username.toString()
                            }, {
                                name: 'Reason: ' ,
                                value: args.slice(1).join(" ")
                            },

    
                        )
                        .setImage('https://i.gifer.com/2ayx.gif')
                        .setTimestamp()
                        .setFooter({
                            text: 'Kicked Back',
                            iconURL: 'https://www.pinclipart.com/picdir/middle/1-13411_clip-art-football-field-field-goal-post-clipart.png'
                        });
    
                    message.channel.send({
                        embeds: [em]
                    });
                    }

                } else {
                    return message.channel.send("Enter a reason")
                }
        } else {
            return message.channel.send("Mention a user.")
        }
    },
};