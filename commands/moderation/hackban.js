module.exports = {
    name: 'hackban',
    description: 'bans a user by id.',
    execute(client, message, args) {
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
        let userid = args[0];
                    if (userid.length != 18) {
                        return message.channel.send("Please send a user id (this should be an 18 digit number.)");
                    } else {
                        client.hack.findOne({
                            ServerId: message.guild.id,
                            UserId: userid
                        }, ((err, res) => {
                            if (err) return console.log(err)
                            if (!res) {
                                const newRes = new client.hack({
                                    ServerId: message.guild.id,
                                    UserId: userid,
                                    Exists: 1
                                })
                                newRes.save().catch(err => console.log(err))
                                message.channel.send(`User with the id of ${userid} was banned from the server ${message.guild.name}`)
                            } else {
                                message.channel.send("This user was already banned from the server!");
                            }
                        }))
                    }
    },
};