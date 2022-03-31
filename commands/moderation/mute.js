module.exports = {
    name: 'mute',
    description: 'mutes',
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
                if (args[2]) {
                    
                    mem = message.mentions.members.first();
                    console.log(args)
                   console.log(message.author.username)
                    if (!mem || mem == undefined) {
                        message.channel.send("Member not found.");
                        return;
                    } else {
                        mem.timeout(args[1] * 60 * 1000, args[2])
                            .then(console.log)
                            .catch(console.error);
                            console.log(message.author.username);
                            console.log(mem.user.username);
                            console.log(args[1]*60*1000);
                            console.log(args.slice(2).join(" "));
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
                                    name: 'Muted User Name: ',
                                    value: mem.user.username
                                }, {
                                    name: 'Duration (m): ',
                                    value: args[1].toString()
                                }, {
                                    name: 'Reason: ' ,
                                    value: args.slice(2).join(" ")
                                },

        
                            )
                            .setImage('https://c.tenor.com/3wEt9q8PG3MAAAAC/zipped-mouth-wont-tell.gif')
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
                    return message.channel.send("Enter a reason.")
                }
            } else {
                return message.channel.send("Enter a timeframe in minutes")
            }
        } else {
            return message.channel.send("Mention a user.")
        }
    },
};