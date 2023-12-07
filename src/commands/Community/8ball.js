const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Use /8ball to get response from Magic Declassifed 8Ball!')
    .addStringOption(option => 
        option
        .setName('question').setDescription('Ask the Declassified 8ball a question!').setRequired(true)
        ),
        async execute(interaction, client) {

            const responses = [
                'It is certain.',
                'It is decided so.',
                'Without a doubt!',
                'Yes - Definitely',
                'You may rely on it.',
                'As I see it, yes.',
                'Most likely.',
                'Not a chance.',
                'Nope.',
                'Not a single percent.',
                'I say nope.',
                'LOL nah.',
                'A thousand percent yes!',
                'I am not certain but yes',
                'I say it is 50/50'
            ];

            // const msg = await interaction.reply({
            //     content: "Declassified 8ball is thinking...",
            //     fetchReply: true,
            // });

            const randomIndex = Math.floor(Math.random() * responses.length);
            const question = interaction.options.getString('question');
            const msg = responses[randomIndex];

            await interaction.reply("**Your Question: **___" + question + "___\n**Magic 8ball: **__" + msg +"__");
        }

}