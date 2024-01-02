const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const client = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('music-volume')
    .setDescription('Adjust the volume of the player.')
    .addNumberOption(option =>
        option.setName('percent')
        .setDescription('Input numbers from 1 to 100.')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)),

    async execute(interaction, client) {
        const { member, guild, options } = interaction;
        const embed = new EmbedBuilder();
        const voiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);
        const volume = options.getNumber("percent");

        if (!voiceChannel) {
            embed.setColor("Red").setDescription("You must be in a voice channel to execute music commands.");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      
        if (!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription(`You can't use the music player as it is already active in <#${guild.members.me.voice.channelId}>`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!queue) {
            embed.setColor('Red')
            .setDescription('⚠️ | There is no queue!');

            return interaction.reply({ embeds: [embed], ephermal: true});
        }

        try {
            client.distube.setVolume(voiceChannel, volume);
            embed.setColor('#0099ff')
            .setDescription(`🔊 | The volume has been set to ${volume}%`);

            return interaction.reply({ embeds: [embed] });
        }

        catch (err) {
            console.log(err);
      
            embed.setColor("#457cf0").setDescription("⛔ | Something went wrong...");
      
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}