const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Declassified Crib bot information.'),
    async execute(interaction, client) {
        await interaction.reply({ content: 'The bot is currently under development! It aims to be the utility bot for Declassified Crib server, made by SilentZzz.'});
    }

}