const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName ('bard')
    .setDescription ('Ask BardAI a question!')
    .addStringOption (option => option.setName('question').setDescription('Enter your question here:').setRequired(true)),
    async execute (interaction) {

        await interaction.deferReply({ ephermal: true});

        const {options} = interaction;
        const question = options.getString('question');

        const input = {
            method: 'GET',
            url: 'https://google-bard1.p.rapidapi.com/',
            headers: {
                text: question,
                psid: 'eAiALIud4BtRyYdq_hG_Q7vIUR_tHm-iHskS0mB9tM_Xrbnf6zMrkoK_YcjG6ZjuD9tfOQ',
                'X-RapidAPI-Key': '36e91706d2msh950d5cc7eef5018p14d76fjsnaffb9da1b9c3',
                'X-RapidAPI-Host': 'google-bard1.p.rapidapi.com'
            }
        };
        
        try {
            const output = await axios.request(input);

            const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setDescription(output.data.response);

            await interaction.editReply({ embeds: [embed ]});
        } catch (e) {
            return await interaction.editReply({ content: `There was an issue getting a response. Please try again later!` });
        }

    }
}