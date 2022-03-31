module.exports = {
    name: 'osinfo',
    description: 'Gives info about OS.',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const osu = require('node-os-utils');
        const {
            MessageEmbed
        } = require('discord.js');

        var os = osu.os
        var cpu = osu.cpu;
        var mem = osu.mem;
        var cpuc = cpu.count();
        var totmem = null;
        var usedmem = null;
        var freemem = null;
        mem.info().then(info => {
            totmem = info.totalMemMb;
            usedmem = info.usedMemMb;
            freemem = info.freeMemMb;

        })
        var load = cpu.loadavg()
        var up = os.uptime();
        var osCmd = osu.osCmd;
        osCmd.whoami().then(adminname => {
            cpu.usage().then(cpuPercent => {
                console.log('CPU Usage (%): ' + cpuPercent + "%");

                const em = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('OS Info')
                    .setAuthor({
                        name: message.author.username
                    })
                    .setDescription('Displays OS info.')
                    .addFields({
                            name: 'Operator Name: ',
                            value: adminname
                        }, {
                            name: 'CPU Usage: ',
                            value: cpuPercent.toString() + "%"
                        }, {
                            name: 'CPU Count: ',
                            value: cpuc.toString() + " cores"
                        }, {
                            name: 'CPU Model: ',
                            value: cpu.model()
                        }, {
                            name: 'Total Memory: ',
                            value: totmem.toString() + " MB"
                        }, {
                            name: 'Used Memory:',
                            value: usedmem.toString() + " MB"
                        }, {
                            name: 'Free Memory: ',
                            value: freemem.toString() + " MB"
                        }, {
                            name: 'Load Average: ',
                            value: load.toString()
                        }, {
                            name: 'System Uptime: ',
                            value: (up/60).toString() + " minutes"
                        },

                    )
                    .setImage('https://cdnb.artstation.com/p/assets/images/images/021/414/971/large/mo_-xusay-cpu-cycles.jpg?1571605038')
                    .setTimestamp()
                    .setFooter({
                        text: 'Op Dop',
                        iconURL: 'https://blenderartists.org/uploads/default/original/4X/b/a/7/ba7c3925a4d4d7165654f7832b2d2828957a4c87.jpeg'
                    });

                message.channel.send({
                    embeds: [em]
                });
            });
        });


    },
}