const { Snake, TicTacToe, RockPaperScissors } = require('discord-gamecord');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
    .setName('game')
    .setDescription('Play variety of Declassified Bot games!')
    .addSubcommand(subcommand => 
        subcommand
        .setName('tic-tac-toe')
        .setDescription('Play TicTacToe on Declassified Crib server!')
        .addUserOption(option => 
            option
            .setName('user')
            .setDescription('Invite a user to play the game with!')
            .setRequired(true)))
    .addSubcommand(subcommand => 
        subcommand
        .setName('snake')
        .setDescription('Play the Snake Game on Declassified Crib server!'))
    .addSubcommand(subcommand => 
        subcommand
        .setName('rock-paper-scissor')
        .setDescription('Play Rock Paper Scissor with an opponent!')
        .addUserOption(option =>
            option
            .setName('user')
            .setDescription('Invite a user to play the game with!')
            .setRequired(true))),


    async execute (interaction) {
        const Game = interaction.options.getSubcommand();

        if (Game === 'tic-tac-toe') {
        
            const TicTacToeGame = new TicTacToe({
                message: interaction,
                isSlashGame: true,
                opponent: interaction.options.getUser('user'),
                embed: {
                    title: 'Tic Tac Toe!',
                    color: '#575757',
                    statusTitle: 'Status',
                    overTitle: 'Game Over!'
                },

                emojis: {
                    xButton: '✖️',
                    oButton: '⭕',
                    blankButton: '➖'
                },

                mentionUser: true,
                timeoutTime: 60000,
                xButtonStyle: 'DANGER',
                oButtonStyle: 'PRIMARY',
                turnMessage: "{emoji} | It's your turn, **{player}**",
                winMessage: "{emoji} | **{player}** has won the TicTacToe Game!",
                tieMessage: 'The game has tied! No one won the Tic Tac Toe game. :(',
                timeoutMessage: 'The game concluded after inactivity! No one won the game.',
                playerOnlyMessage: 'Only {player} and {opponent} can interact with the current game!'
            });

            TicTacToeGame.startGame();
            TicTacToeGame.on('gameover', result => {
                return;
            })
            
        }

        else if (Game === 'snake') {

            const SnakeGame = new Snake({
                message: interaction,
                isSlashGame: true,
                embed: {
                    title: 'Snake',
                    overtitle: 'Game over!',
                    color: '#5865F2'
                },

                emojis: {
                    board: '⬛',
                    food: '🍎',
                    up: '⬆️', 
                    down: '⬇️',
                    left: '⬅️',
                    right: '➡️',
                },

                snake: { head: '🟢', body: '🟩', tail: '🟢', skull: '💀' },
                foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
                stopButton: 'Stop',
                timeoutTime: 60000,
                playerOnlyMessage: 'Only {player} can use these buttons.'
            });

            SnakeGame.startGame();
            SnakeGame.on('gameover', result => {
                return;

            })

        }

        else if (Game === 'rock-paper-scissor') {

            const RPSGame = new RockPaperScissors({
                message: interaction,
                isSlashGame: true,
                opponent: interaction.options.getUser('user'),

                embed: {
                    title: 'Rock Paper Scissors',
                    color: '#5865F2',
                    description: 'Press a button below to make a choice.'
                },

                buttons: {
                    rock: 'Rock',
                    paper: 'Paper',
                    scissors: 'Scissors'
                  },

                  emojis: {
                    rock: '🌑',
                    paper: '📰',
                    scissors: '✂️'
                  },

                  mentionUser: true,
                  timeoutTime: 60000,
                  buttonStyle: 'PRIMARY',
                  pickMessage: 'You choose {emoji}.',
                  winMessage: '**{player}** won the Game! Congratulations!',
                  tieMessage: 'The Game tied! No one won the Game!',
                  timeoutMessage: 'The Game went unfinished! No one won the Game!',
                  playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
                });
                
                RPSGame.startGame();
                RPSGame.on('gameOver', result => {
                  return;
            })

        }
    }
}