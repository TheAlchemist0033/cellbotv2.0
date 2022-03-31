const Discord= require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_MEMBERS","GUILDS","GUILD_BANS","GUILD_INVITES","GUILD_VOICE_STATES"],});

const fs = require("fs");
client.wait = require('util').promisify(setTimeout);
client.mongoose = require("mongoose");
client.hack = require("./hack.js");
client.mod = require("./mod.js");
const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.

//Deprecated: client.mute = require('/home/thealchemist/Desktop/Programming/Javascript/cellbot/mute.js');//
const config = require("./config.json");

client.commands = new Discord.Collection();
let comList = []
fs.readdir("./commands/", (err, folders) => {
    if (err) throw err;
    for (let i = 0; i < folders.length; i++) {
        fs.readdir(`./commands/${folders[i]}`, (e, files) => {
            if (e) console.log(e)
            let jsfiles = files.filter(f => f.split(".").pop() === 'js');
            if (jsfiles.length < 1) {
                console.log(`No commands in ${folders[i]}`);
                return;
            }
            jsfiles.forEach((file) => {
                let properties = require(`./commands/${folders[i]}/${file}`);
                console.log(`Loaded ${file}`);
                comList.push(file);
                client.commands.set(properties.name, properties)
            })
        })
    }
})
client.on("ready", async () => {
    var users = client.users.cache.filter(user => !user.bot);
    console.log(users)
    console.log(`Bot has started, with ${users.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    const url = 'mongodb://127.0.0.1:27017';
    client.mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
        console.log(`MongoDB Connected: ${url}`);
 
    client.wait(1000);
});
client.on('guildMemberAdd', member => {

    fs.readFile("./logfile.txt", "utf-8", function(err, data){
        if(err) throw err;
        var nv = member.user.username+" "+ member.id+"\n";
        console.log(nv);
        fs.writeFile('./logfile.txt', nv, 'utf-8', function(err, data){
            if(err) throw err;
            console.log("Written to logfile: " + nv + " joined\n")
        })
    })
    client.hack.findOne({
        ServerId: member.guild.id,
        UserId: member.user.id
    }, ((err, res) => {
        if (err) return console.log(err)
        if (!res) {
        } else {
            console.log(member)
            member.ban({reason:"Hackban."})
           // message.channel.send(`User with ID of ${member.user.id} [${member.user.username}] was hackbanned from the server!`);
        }
    }))
})
client.on("guildDelete", guild => {
    
});
client.on("guildCreate", guild => {
    
})
////////////primary message event
client.on("message", async message => {
    function log(logmessage) {
        if (message.guild.channels.has(logChannel)) {
            message.guild.channels.get(logChannel).send({
                embed: logmessage
            }).then().catch(err => console.log(err));
        }
    }
    if (message.author.bot) return;

    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
    var prefix = config.prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const nanargs = message.content.split(/ +/g)
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) return;




    if (command === "eval") {
        if (message.author.id !== "608802993810440223" && message.author.id !== "149686265271418880" && message.author.id !== "221442254504591360") {
            return message.channel.send("USER NOT AUTHORIZED");
        }
        try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
    if (command == "help") {
        message.channel.send(`${comList.join(' ')}`)
    }
    const cmd = client.commands.get(command);
    if (!cmd) return;
    console.log("success")
    await cmd.execute(client, message, args, Discord);
});
///////////update message event
client.on("MessageUpdate", async message => {
    function log(logmessage) {
        if (message.guild.channels.has(logChannel)) {
            message.guild.channels.get(logChannel).send({
                embed: logmessage
            }).then().catch(err => console.log(err));
        }
    }
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const nanargs = message.content.split(/ +/g)
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) return;
    const cmd = client.commands.get(command);
    if (!cmd) return;
    console.log("success")
    await cmd.execute(client, message, args, Discord);
});
client.on('error', console.error);
client.login("Nzg3MTQ5MzM4NDc2NDEyOTM4.X9Qv8g.A2e6hXuCPy6DW_TrdAprBNhVWNk");