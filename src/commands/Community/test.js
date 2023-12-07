const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('test command only.'),
    async execute(interaction, client) {
        await interaction.reply({ content: 'The bot is up and running!\nUse **/help** for the list of commands.'});
    }

}