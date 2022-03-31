module.exports = {
    name: 'play',
    description: 'Skibidi bop pop pow. Lets get *groovy*.',
    async execute(client, message, args) {
        if (!client.musicmap) client.musicmap = new Map();
        const Discord = require('discord.js'); //---------
        const ytdl = require('ytdl-core'); //Init Declares
        const yts = require('yt-search'); //---------
        const {
            joinVoiceChannel, //-------
            createAudioPlayer, //+
            createAudioResource, //+
            entersState, //+
            StreamType, //Util Declares
            AudioPlayerStatus, //+
            VoiceConnectionStatus, //+
            //createDiscordJSAdapter,    //+
        } = require('@discordjs/voice'); //-------
        const userid = message.author.id; //-------
        var result = []; //+
        let num = 0; //Manual Declares
        var videoresponse = 0; //-------

        function finish(client, musicmap, data) {
            let thingy = musicmap.get(data.guildID)
            //console.log(thingy + " thingy")
            if (client.musicmap.get(message.guild.id).loop == 0) {
                thingy.queue.shift();
            }
            if (client.musicmap.get(message.guild.id).loop == 1) {
                num = num + 1;
            }
            // console.log(thingy.queue.length)
            if (num > (thingy.queue.length - 1)) {
                num = 0;
            }
            if (thingy.queue.length > 0) {
                musicmap.set(data.guildID, thingy);
                playSong(client, musicmap, thingy);
            } else {

                musicmap.delete();
                data.connection.destroy();
                data.dpat = undefined;
                data.connection = undefined;
                data.con = undefined;
            }


        }
        var player = createAudioPlayer()
        ///VOICE FUNCTION DECLARATION///
        async function connectToChannel() {
            data.connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })
            // data.con = 1;///this sucks butt

            try {
                await entersState(data.connection, VoiceConnectionStatus.Ready, 30e3);
                //console.log("hithere")
            } catch (error) {
                data.connection.destroy();
                data.con = undefined;
                data.connection = undefined;
                console.log(error);
                throw error;
            }
        }

        async function playSong(client, musicmap, data) {
            //console.log(`num: ${num}`)
            const playem = new Discord.MessageEmbed()
                .setTitle("Now Playing: ")
                .addField("Song name:", data.queue[num].SongTitle)
                .addField("Song URL:", data.queue[num].Url)
                .addField("Youtube Channel: ", data.queue[num].Channel)
                .addField("Requested by: ", data.queue[num].Request)
            client.channels.cache.get(data.queue[num].inChannel).send({
                embeds: [playem]
            })
            var stream = await ytdl(data.queue[num].Url, {
                filter: 'audioonly'
            });
            stream.on('error', error => console.log("error: stream: " + error));
            var resource = createAudioResource(stream, {
                inputType: StreamType.Arbitrary //,inlineVolume:true

            });
            // resource.volume.setVolume(0.8);
            data.con = player.play(resource);
            player.on(AudioPlayerStatus.Idle, () => {
                console.log('The audio player has died!');
                finish(client, musicmap, data);

            });
            data.connection.subscribe(player);
            //data.con = 2;
            //return entersState(player, AudioPlayerStatus.Playing, 5e3);

        }

        ///END FUNCTION DECLARATIONS///

        let embed = new Discord.MessageEmbed();
        if (!args[0]) return message.channel.send("I could not locate any arguments. Please enter a song/video name.");
        if (!message.member.voice.channel) return message.channel.send("Please join a voice channel to listen to music.");
        data = client.musicmap.get(message.guild.id) || {};
        //console.log(data);
        if (!data.connection) connectToChannel();
        if (!data.queue) data.queue = [];
        data.guildID = message.guild.id;
        data.loop = 0;
        const r = await yts(args.join(' '));
        //console.log(r);
        const videos = r.videos.slice(0, 5);
        let x = 1;


        let bjack = 0;
        videos.forEach(function(v) {
            const views = String(v.views).padStart(10, ' ');
            result.push(v)
            embed.addField(`${x})`, ` ${v.title} (${v.timestamp}) + from ${v.author.name}`);
            x += 1
        })
        await message.channel.send({
            embeds: [embed]
        })
        message.channel.send("Please enter a number corresponding to the video you wish to play. ")
        try {
            if (message.author.id != userid) {

            } else {
                const filter = (m) => m.author.id === message.author.id;
                const collector = await message.channel.createMessageCollector(filter, {
                    time: 20000
                });
                collector.on('collect', m => {
                    if (m.author.id == message.author.id) {
                        bjack += 1

                        if (bjack == 1) {
                            if (Number.isInteger(Number(m.content))) {
                                //////////counting system//////////
                                // console.log(m.content);
                                videoresponse = m.content;
                                message.channel.send("Processing statement.");
                                collector.stop();
                            } else {

                                collector.stop();
                                return message.channel.send("Error: 0x000002 You entered something that was not a number. Menu creation has been cancelled. Please try again.")
                            }
                        }
                    }
                })
                collector.on('end', m => {
                    const reply = parseInt(videoresponse) - 1;
                    //console.log(data.queue[0]);
                    if (!data.queue[0]) {
                        data.queue.push({
                            SongTitle: result[reply].title,
                            Request: message.author.tag,
                            Url: result[reply].url,
                            Channel: result[reply].author.name,
                            inChannel: message.channel.id,

                        })
                        playSong(client, client.musicmap, data);
                    } else {
                        data.queue.push({
                            SongTitle: result[reply].title,
                            Request: message.author.tag,
                            Url: result[reply].url,
                            Channel: result[reply].author.name,
                            inChannel: message.channel.id,

                        })
                        const songem = new Discord.MessageEmbed()
                            .setTitle("Song Added to Queue")
                            .addField("Song name:", result[reply].title)
                            .addField("Song URL:", result[reply].url)
                            .addField("Youtube Channel: ", result[reply].author.name)
                            .addField("Requested by: ", message.author.tag)
                        message.channel.send({
                            embeds: [songem]
                        })
                    }

                    //console.log("Dispatcher" + data.dpat)
                 /*     data.queue.push({
                        SongTitle: result[reply].title,
                        Request: message.author.tag,
                        Url: result[reply].url,
                        Channel: result[reply].author.name,
                        inChannel: message.channel.id,
                    })*/
                    //console.log(data)
                    client.musicmap.set(message.guild.id, data);

                    result = [];

                })
            }

        } catch (err) {
            console.error(err);
            return message.channel.send('No video selected, or value out of range. Please try again.');
        }




    },
};