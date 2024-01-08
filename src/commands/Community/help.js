const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List of Commands available for users.'),
    async execute(interaction, client) {

        let commands = [];

        client.commands.forEach(command => {

            commands.push({
                name: command.data.name || "Error",
                description: command.data.description || "Error"
            });
        });

        const commandList = commands.map(command => {

            return {
                value: `**/${command.name}**\n - ${command.description}`,
                name: `\u200b` //An invisible character as discord does not like empty fields
            };
        });

        const embed = {
            color: parseInt("#00ff00".replace("#", ""), 16),
            title: `Declassified Crib Help Desk`,
            description: `## All available commands from the bot!`,
            fields: commandList,
            footer: {
                text: `${client.user.username} | Command List from the Bot`
            }
        };

        await interaction.reply ({
            embeds: [embed]
        });

    }

};