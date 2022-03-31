module.exports = {
    name: 'np',
    description: 'Whats playing now? Idk...',
    async execute(client, message, args) {
        let fetched = client.musicmap.get(message.guild.id);
        if(!fetched) return message.channel.send("No music is playing here.");
        let queue = fetched.queue
        let np = fetched.queue[0]
        let npmes = '\```|---Now Playing---|\ \n'+np.SongTitle+ ' Requester: '+ np.Request
        message.channel.send(npmes+"\`\`\`");
    }, 
};