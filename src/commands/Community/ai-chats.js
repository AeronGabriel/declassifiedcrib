const {SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ai-chats')
    .setDescription('Declassified Crib bot integrated with ChatGPT (GPT 4 Turbo Model)'),
    async execute(interaction, client) {

        const embed = new EmbedBuilder()
        .setTitle('GPT 3 | GPT 4 | Bard')
        .setColor(0xFF0000)
        .setThumbnail(interaction.client.user.displayAvatarURL({ size: 128 }))
        .setDescription(`- React on ":robot:" emoji in <#1000817293380571157> for ChatGPT 4 Turbo channel access (<#1179294880321769522>).
                        \n\n - Use **/ai-gpt3** for GPT 3 Model.
                        \n\n - Use **/ai-bard** to ask Google Bard!`);

        await interaction.reply({ embeds: [embed] });
    }
}