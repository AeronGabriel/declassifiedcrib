const { ButtonBuilder, ActionRowBuilder, SlashCommandBuilder, ButtonStyle } = require("discord.js");
const { EmbedBuilder, PermissionsBitField, Embed } = require("discord.js");
// const { musicCard } = require("musicard"); // Import musicard module

const fs = require("fs");
const client = require("../index.js");

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// Function to create and send the music card
async function sendMusicEmbed(queue, song) {
  // Create a music card
  const embed = new EmbedBuilder()
  .setTitle(song.name)
  .setColor('#00ff00')
  .setDescription(`▶︎ **0:00** •  ━━━⬤───────────────  • **${song.formattedDuration}**\n**Now Playing!**\nRequested by ${song.user} \n${status(queue)}`)
  .setThumbnail(song.thumbnail);

  queue.textChannel.send({
    embeds: [embed.toJSON()],
  }).then((message) => {
    queue.currentMessage = message;
  });
}

client.distube
  .on('playSong', async (queue, song) => {
    if (queue.currentMessage) {
      queue.currentMessage.delete().catch(console.error);
      queue.currentMessage = undefined;
    }

    // Send the music card
    await sendMusicEmbed(queue, song);
  })
  .on('addSong', (queue, song) => {
    // queue.textChannel.send(`🎶 Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`);
    const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(`🎶 Added ${song.name} to the queue!`)
    .setDescription(`**Duration:** ${song.formattedDuration} \n **Added by:** ${song.user}`)

    queue.textChannel.send({ embeds: [embed] });
  })
  .on('addList', (queue, playlist) => {
    // queue.textChannel.send(`🎶 Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`);
    const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(`Added ${playlist.name} playlist to the queue!`)
    .setDescription(`**Songs:** ${playlist.songs.length} \n** ${status(queue)}`)

    queue.textChannel.send({ embeds: [embed] });
  })
  .on('error', (channel, e) => {
    console.error(e);
  })
  .on('empty', (channel) => {
    // channel.send(':no_entry: Voice channel is empty! Leaving the channel...');
    const embedEmpty = new EmbedBuilder()
    .setColor('#0099ff')
    .setDescription(':no_entry: Voice channel is empty! Leaving the channel...')

    channel.send({ embeds: [embedEmpty] });
  })
  .on('searchNoResult', (message, query) => {
    // message.channel.send(`⛔ No result found for \`${query}\`!`);
    const embedNR = new EmbedBuidler()
    .setColor('#0099ff')
    .setDescription(`⛔ No result found for **${query}**!`)

    message.channel.send({ embeds: [embedNR] });
  })
  .on('finish', (queue) => {
    // queue.textChannel.send(':checkered_flag: Queue finished!')
    const embedFinish = new EmbedBuilder()
    .setColor('#0099ff')
    .setDescription(':checkered_flag: Queue finished! Leaving the voice channel...')

    queue.textChannel.send({ embeds: [embedFinish] }).then((message) => {
      queue.currentMessage = message;
    });
    queue.voice.leave();
  });
