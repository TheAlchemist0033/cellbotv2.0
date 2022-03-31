module.exports = {
    name: 'loop',
    description: 'Music portion of the bot.',
    async execute(client, message, args) {
        let fetched = client.musicmap.get(message.guild.id);
        if(!fetched) return message.channel.send("No music is playing here.");
        if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("You are not in a voice channel with me.");
       
        if(fetched.loop == 0){
            message.channel.send("Looping Song! Type this command again to disable looping.");
            fetched.loop = 1
        }else if(fetched.loop == 1){
            message.channel.send("Looping Disabled!")
            fetched.loop = 0
        }
    }, 
};