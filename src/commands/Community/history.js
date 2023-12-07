const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('history')
    .setDescription('Server history.'),
    async execute(interaction, client) {
        await interaction.reply({ content: "**[ H I S T O R Y ]**\nThe server was created by SilentZzz & friends from their previous school to have a lounge for their close friends/classmates.\nThe server was also used for gaming back in the old days, playing mobile games like Rules of Survival, PUBG, Call of Duty: Mobile etc.\nThis server is now for FNF with different channels corresponding to your server roles. \n\n**[ F O U N D E R S ]**\n- *__SilentZzz__* (SilentZzz :rocket:#0029)\n- *__Liempo__* (shanti#6241)\n- *__Nayr7928__* (Nayr7928#2792)"});
    }

}