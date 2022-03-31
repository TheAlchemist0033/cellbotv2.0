module.exports = {
    name: 'ping',
    description: 'Determines latency',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const {
            MessageEmbed
        } = require('discord.js');
        //debug console.log(message.createdTimestamp+":"+Date.now())
        const em = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Ping Pong')
        .setAuthor({
            name: message.author.username
        })
        .addFields({name: 'Message response: ',value: `${Date.now()-message.createdTimestamp} ms`, inline: true }, 
        { name: 'Neural Speed: ',value: `${Math.round(client.ws.ping)} ms/action`,inline: true }, 
        )
        .setImage('https://static01.nyt.com/images/2014/01/03/arts/03BOOK/03BOOK-superJumbo.jpg')
        .setFooter({
            text: 'Bleep Bloop',
            iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDvFfnYwKfGArkdZSesKHhOFzkjFZ4TjPJCQ&usqp=CAU'
        });
        message.channel.send({
            embeds: [em]
        });
    },
};