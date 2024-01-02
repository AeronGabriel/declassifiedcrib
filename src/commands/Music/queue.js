const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const client = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('music-queue')
    .setDescription('View the queue.'),

    async execute(interaction) {
        const { options, member, guild, channel } = interaction;
        const embed = new EmbedBuilder();
        const voiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);

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
            embed.setColor('Green')
            .setTitle('**QUEUE**')
            .setDescription(`${queue.songs.map(
                (song, id) => `\n**${id + 1}.** __${song.name}__ - **${song.formattedDuration}**`)}`);
            

            await interaction.reply({ embeds: [embed] });
        }

        catch (err) {
            console.log(err);
      
            embed.setColor("#457cf0").setDescription("⛔ | Something went wrong...");
      
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}