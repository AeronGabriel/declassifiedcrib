// const { SlashCommandBuilder } = require('@discordjs/builders');

// module.exports = {
//     data: new SlashCommandBuilder()
//     .setName('ping')
//     .setDescription('Client ping checker.'),
//     async execute(interaction, client) {

//         const msg = await interaction.reply({
//             content: "Pinging...",
//             fetchReply: true,
//         });
//         const latency = `${msg.createdTimestamp - interaction.createdTimestamp}`;

//         interaction.editReply({ content: `:ping_pong: **Pong!** :ping_pong:\nLatency is ***__${latency}ms__***. \nAPI Latency is: ***__` + client.ws.ping + `ms__***.`});
//     }

// }

/*const { SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Client ping checker."),

    async execute(interaction, client) {
        const msg = await interaction.reply({
            content: "Pinging...",
            fetchReply: true,
        });
        const latency = `${msg.createdTimestamp - interaction.createdTimestamp}`;

        interaction.editReply({
            content: `Pong!\nLatency is ${latency}ms\nAPI Latency is ${client.ws.ping}ms`,
        });
    },
};*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Client ping checker and uptime status'),
    async execute(interaction) {
        let circles = {
            good: '<:yellow_circle:> ',
            okay: '<:green_circle:> ',
            bad: '<:red_circle:>',
        };
 
        await interaction.deferReply(); // Defer the reply before editing
 
        const pinging = await interaction.editReply({ content: 'Pinging...' });
 
        const ws = interaction.client.ws.ping; // websocket ping
        const msgEdit = Date.now() - pinging.createdTimestamp; // api latency
 
        // uptime
        let days = Math.floor(interaction.client.uptime / 86400000);
        let hours = Math.floor(interaction.client.uptime / 3600000) % 24;
        let minutes = Math.floor(interaction.client.uptime / 60000) % 60;
        let seconds = Math.floor(interaction.client.uptime / 1000) % 60;
 
        const wsEmoji = ws <= 100 ? circles.good : ws <= 200 ? circles.okay : circles.bad;
        const msgEmoji = msgEdit <= 200 ? circles.good : circles.bad;
 
        const pingEmbed = new EmbedBuilder()
            .setTitle(':ping_pong: Pong! :ping_pong:')
            .setThumbnail(interaction.client.user.displayAvatarURL({ size: 128 }))
            .setColor('Blue')
            .setTimestamp()
            .setFooter({ text: `Pinged At` })
            .addFields(
                {
                    name: 'Websocket Latency',
                    value: `${wsEmoji} \`${ws}ms\``,
                },
                {
                    name: 'API Latency',
                    value: `${msgEmoji} \`${msgEdit}ms\``,
                },
                {
                    name: `${interaction.client.user.username}'s Uptime`,
                    value: `<:timer:> \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``,
                }
            );
 
        await pinging.edit({ embeds: [pingEmbed], content: '\u200b' });
    },
};