
module.exports = {
    name: 'purge',
    description: 'Purge up to 99 messages.',
    async execute(client, message, args) {
        const {
            Permissions
        } = require('discord.js');
        const {
            MessageEmbed
        } = require('discord.js');

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return message.channel.send("You have no permissions to do this.");
        }else{
            const amount = parseInt(args[0]) + 1;
            if (isNaN(amount)) {
                return message.reply('That doesn\'t seem to be a valid number.');

                } else if (amount <= 1 || amount > 1000) {
                    return message.reply('You need to input a number between 1 and 999.');
                }
            var divam = Math.floor(amount/100);
            var remam = amount - divam*100;
            for(let i =0; i<divam;i++){
                await message.channel.bulkDelete(100, true).catch(err => {
                        console.error(err);
                        message.channel.send('There was an error during this purge. Contact a developer. Ex000');
                })
            }
            if(remam >0){
                message.channel.bulkDelete(remam,true).catch(err => {
                    console.error(err);
                    message.channel.send('There was an error during this purge. Contact a developer. Ex001')
                }).then(etc =>{
                    message.channel.send(`${amount} messages were deleted successfully`);
                })  
            }

        }
}};