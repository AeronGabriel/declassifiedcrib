const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinvite')
    .setDescription('Generates the invite link of the Server.'),
    async execute(interaction, client) {
        await interaction.reply({ content: '**[ I N V I T E   L I N K ]**\nhttps://discord.com/invite/83buvaqQp8'});
    }

}