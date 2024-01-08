const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai-gpt3')
        .setDescription('Chat with AI (GPT 3 Model)')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Your message to AI')
                .setRequired(true)
        ),
    async execute(interaction) {
      
        await interaction.deferReply();

        const message = interaction.options.getString('message');

        // Add a prompt before the original message
        const prompt = 'hey, You receive a message: ' + message;

        const apiUrl = `https://api.artix.cloud/api/v1/AI/gpt3.5T?q=${encodeURIComponent(prompt)}`;

        try {
            
            const response = await axios.get(apiUrl);

            
            if (response.status === 200) {
                const chatData = response.data.chat; 

                // const embed = {
                //     color: 0x0099ff,
                //     title: 'Chat with AI (GPT 3)',
                //     description: chatData,
                    
                // };

                const embed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle('Chat with GPT 3')
                .setThumbnail(interaction.client.user.displayAvatarURL({ size: 128 }))
                .setDescription(chatData)
                .setTimestamp()
                .setFooter({text: 'Powered by ArtixAPI for GPT3 Model'});

                await interaction.followUp({ embeds: [embed] });
            } else {
                await interaction.followUp('An error occurred while fetching chat data.');
            }
        } catch (error) {
            console.error(error);
            await interaction.followUp('An error occurred while processing your request.');
        }
    },
};