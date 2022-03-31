module.exports = {
    name: 'unmute',
    description: 'unmutes',
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
                    mem = message.mentions.members.first();
                    console.log(args)
                   console.log(message.author.username)
                    if (!mem || mem == undefined) {
                        message.channel.send("Member not found.");
                        return;
                    } else {
                        mem.timeout(0, args[0])
                            .then(console.log)
                            .catch(console.error);
                            val = args[1]*60*1000
                            const em = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('User Successfully Muted')
                            .setAuthor({
                                name: message.author.username
                            })
                            .addFields({
                                    name: 'Admin Name: ',
                                    value: message.author.username,
                            },{
                                    name: 'Unmuted User Name: ',
                                    value: mem.user.username
                            }
                            )
                            .setTimestamp()
                            .setFooter({
                                text: 'Zip Zap',
                                iconURL: 'https://www.pinclipart.com/picdir/middle/558-5589390_zipper-face-emoji-clipart.png'
                            });
                            console.log(em)
                        message.channel.send({
                            embeds: [em]
                        });
                    }
        } else {
            return message.channel.send("Mention a user.")
        }
    },
};