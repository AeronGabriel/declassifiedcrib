const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ButtonInteraction, PermissionsBitField, ActionRow } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Use this command to open a new Ticket.'),
    async execute(interaction, client) {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "**/ticket** command use denied! You are not an Administrator of this server!"});

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setEmoji('📥')
            .setLabel('Create a ticket!')
            .setStyle(ButtonStyle.Secondary),

        )
        

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Support & tickets")
        .setDescription('Tap a Button to create a ticket! \n **[ __N O T E__ ]**\nIf this bot is not working, please use the other ticket tools above/below!')

        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {
            
            await i.update({ embeds: [embed], components: [button] });

            const channel = await interaction.guild.channels.create({
                name: `ticket ${i.user.tag}`,
                type: ChannelType.GuildText,
                parent: '1039055229448110140'
            });

            channel.permissionOverwrites.create(i.user.id, { ViewChannel: true, SendMessages: true} );
            channel.permissionOverwrites.create(channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false } );

            channel.send({ content: `Welcome to your ticket, ${i.user}. When you are finished, Admin will remove you from the channel.` });
            //i.user.send(`Your ticket in ***${i.guild.name}*** has been created! You can see your ticket in ${channel}.`);
            //interaction.reply({ content: `Your ticket in ***${i.guild.name}*** has been created! You can see your ticket in ${channel}.`, ephemeral: true });


        })

    }

}