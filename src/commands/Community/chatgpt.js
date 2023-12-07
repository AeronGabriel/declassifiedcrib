const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('chatgpt')
    .setDescription('Declassified Crib bot integrated with ChatGPT'),
    async execute(interaction, client) {
        await interaction.reply({content: "React on :robot: emoji in <#1000817293380571157> for ChatGPT channel access (<#1179294880321769522>)."});
    }
}