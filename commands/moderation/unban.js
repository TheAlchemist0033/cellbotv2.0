module.exports = {
    name: 'unban',
    description: 'unbans',
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
            if (args[0].length != 18) {
                return message.channel.send("Please send a user id (this should be an 18 digit number.)");
            } else {
            message.guild.members.unban(args[0])
                .then(user => message.channel.send(`Unbanned ${user.username} from ${message.guild.name}`))
                .catch(console.error);
            }
        } else {
            message.channel.send("Please enter a user ID. ")
        }
    },
};