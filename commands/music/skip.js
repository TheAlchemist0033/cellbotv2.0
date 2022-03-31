module.exports = {
    name: 'skip',
    description: 'Music portion of the bot.',
    async execute(client, message, args) {
        let fetched = client.musicmap.get(message.guild.id);
        if(!fetched) return message.channel.send("No music is playing here.");
        if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("You are not in a voice channel with me.");
        message.channel.send("Skipping Song!");
        fetched.dpat.emit('end');
    }, 
};