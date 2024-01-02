const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('for Announcement Channel, Admins only. ***(Admins only)***')
    .addStringOption(option =>
        option
        .setName('message').setDescription('message to say').setRequired(true)),
        async execute(interaction) {
            const message = interaction.options.getString('message');

            if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "**/say** command use denied! You are not an Administrator of this server!"});
    
            await interaction.reply(message);
    }

}