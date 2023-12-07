const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List of Commands available for users.'),
    async execute(interaction, client) {
        await interaction.reply({ content: "**[ __C O M M U N I T Y__ ]**\n\n**/8ball** - Ask the Magic Declassified 8ball a question!\n**/help** - Displays the list of commands. \n**/test** - Test command to check the bot's functionality. \n**/history** - Server history (story behind the server).\n**/botinfo** - Information about Declassified Crib bot.\n**/serverinvite** - Generates the invite link of the Server.\n**/ping** - Checks the client ping.\n**/chatgpt** - Have access to ChatGPT channel.\n\n**[ __A D M I N I S T R A T O R__ ]**\n\n**/ticket** - Embeds a ticketing tool, Admin permission required.\n**/say** - For announcement purposes, Admin permission required.\n"});
    }

}