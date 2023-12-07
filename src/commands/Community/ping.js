const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Client ping checker.'),
    async execute(interaction, client) {

        const msg = await interaction.reply({
            content: "Pinging...",
            fetchReply: true,
        });
        const latency = `${msg.createdTimestamp - interaction.createdTimestamp}`;

        interaction.editReply({ content: `:ping_pong: **Pong!** :ping_pong:\nLatency is ***__${latency}ms__***. \nAPI Latency is: ***__` + client.ws.ping + `ms__***.`});
    }

}

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