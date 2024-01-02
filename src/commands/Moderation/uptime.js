const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Tells the bot's uptime. ***(Admins only)***"),
  async execute(interaction, client) {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "**/uptime** command use denied! You are not an Administrator of this server!"});

    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setDescription(
        `:timer: I have Been Up for \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`
      );

    await interaction.reply({ embeds:[embed], ephemeral: true });
  },
}; 