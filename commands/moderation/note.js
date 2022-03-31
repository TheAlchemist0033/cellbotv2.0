
module.exports = {
    name: 'note',
    description: 'takes a note.',
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
        if(args[0]){
            if(args[1]){
            mem = message.mentions.members.first();
            
            client.mod.findOne({
                ServerId: message.guild.id,
                UserId: mem.user.id
            }, ((err, res) => {
                if (err) return console.log(err)
                if (!res) {
                    let rargs = args.slice(1).join(" ")
                    const newRes = new client.mod({
                        ServerId: message.guild.id,
                        UserId: mem.user.id,
                        Warnings:[rargs],
                        Exists: 1
                    })
                    newRes.save().catch(err => console.log(err))
                    message.channel.send(`No prior record found for ${mem.user.username}. Profile created for ${message.guild.name} and note "${rargs}" added.`)
                } else {
                    let rargs = args.slice(1).join(" ");
                    console.log(res)
                    let warnarr = res.Warnigns;
                    res.Warnings.push(rargs);
                    res.Warnigns = warnarr;
                    res.save().catch(err => console.error(err));
                    const em = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('User Successfully ')
                    .setAuthor({
                        name: message.author.username
                    })
                    .addFields({
                            name: 'Admin Name: ',
                            value: message.author.username,
                    },{
                            name: 'User: ',
                            value: mem.user.username
                        }, {
                            name: 'Admin Note: ',
                            value: args.slice(1).join(" ")
                        }
                    )
                    .setImage('https://c.tenor.com/4vT2VPxnh5YAAAAC/usagyuuun-mini-usagyuuun.gif')
                    .setTimestamp()
                    .setFooter({
                        text: 'Nip Nop',
                        iconURL: 'https://images.emojiterra.com/openmoji/v13.1/512px/1f4dd.png'
                    });
                    console.log(res.Warnings)
                    let epoch = res.Warningslength;
                    if(res.Warnings.length >= 20){
                        epoch = 19
                    }
                    for(let i = 0; i < epoch;i++){
                        console.log(i)
                        console.log(em.fields)
                        let namme = `Prior #${i+1}:`
                        console.log(namme)
                        console.log(res.Warnings[i])
                        em.addField("Priors: ",res.Warnings[i].toString())
                        if(i >= 19){
                            em.addField("WARNING: USER HAS A LARGE NUMBER OF NOTES.")
                        }
                    }
                    
                message.channel.send({
                    embeds: [em]
                });
                }
            }))
            } else {
                message.channel.send("Please enter your note.")
            }
        }else{
            message.channel.send("Mention a user.")
        }

    },
};