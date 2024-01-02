const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const remindSchema = require('../../Schemas/remindSchema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Set a reminder for yourself!')
    .addSubcommand(command => command.setName('set').setDescription('Set your reminder.').addStringOption(option => option.setName('reminder').setDescription('What do you want to be reminded of?').setRequired(true)).addIntegerOption(option => option.setName('minutes').setDescription('Minutes from now?').setRequired(true).setMinValue(0).setMaxValue(59)).addIntegerOption(option => option.setName('hours').setDescription('Hours from now?').setRequired(false).setMinValue(1).setMaxValue(23)).addIntegerOption(option => option.setName('days').setDescription('Days from now?').setRequired(false).setMinValue(1).setMaxValue(31))),
    async execute (interaction) {

        const { options, guild } = interaction;
        const reminder = options.getString('reminder');
        const minute = options.getInteger('minutes');
        const hour = options.getInteger('hours');
        const day = options.getInteger('days');

        let time = Date.now() + (day * 1000 * 60 * 60 * 24) + (hour  * 1000 * 60 * 60) + (minute * 1000 * 60);

        await remindSchema.create({
            User: interaction.user.id,
            Time: time,
            Remind: reminder
        });

        const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setDescription(`⏰ Your reminder has been set! <t:${Math.floor(time/1000)}:R>, I will remind you of "${reminder}".`)

        await interaction.reply({ embeds: [embed], ephermal: false});

    }
}