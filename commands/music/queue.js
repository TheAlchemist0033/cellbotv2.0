module.exports = {
    name: 'queue',
    description: 'Whats in my future, I wonder.',
    async execute(client, message, args) {
        let fetched = client.musicmap.get(message.guild.id);
        if(!fetched) return message.channel.send("No music is playing here.");
        let queue = fetched.queue
        let np = fetched.queue[0]
        
        let npmes = '\```|---Now Playing---|\ \n'+np.SongTitle+ ' Requester: '+ np.Request + '\n -----Queue-----\n'
        for(let i = 0; i < queue.length; i ++){
            npmes = npmes + "|---"+queue[i].SongTitle+" Requested by: " + queue[i].Request + '\n'
        }
        message.channel.send(npmes+"\`\`\`");
    }, 
};