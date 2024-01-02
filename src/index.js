const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] }); 

//Music bot testing

const { DisTube } = require("distube");

const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,// you can change this to your needs
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
  });
  
  module.exports = client;

  // file handling

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

//Bot Status || presence

client.on("ready", () => {
    console.log("Bot is up and running!");

    const activities = [
        "Use /help for commands.",
        "as Declassified Crib bot.",
        "Integrated with OpenAI"
    ];
    
    setInterval(() => {
        const status = activities[Math.floor(Math.random() * activities.length)];
        client.user.setPresence({ activities: [{name: `${status}`}]});
    }, 8000);

})

//CHAT GPT FUNCTIONALITY

const { OpenAI } = require('openai');

const IGNORE_PREFIX ="!";
const CHANNELS = ['1179294880321769522'];

const openai = new OpenAI({
    apiKey: process.env.openai_key,
})

client.on('messageCreate', async (message) => {

    if (message.author.bot) return;
    if (message.content.startsWith(IGNORE_PREFIX)) return;
    if (!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;

    await message.channel.sendTyping();

    const sendTypingInterval = setInterval(() => {
        message.channel.sendTyping();
    }, 5000);

    let conversation = [];
    conversation.push({
        role: 'system',
        content: 'Hi there! This is Declassified Crib friendly chatbot. How may I help you today?'
    })

    let prevMessages = await message.channel.messages.fetch({limit: 10});
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
        if (msg.author.bot && msg.author.id !== client.user.id) return;
        if (msg.content.startsWith(IGNORE_PREFIX)) return;

        const username = msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '');

        if (msg.author.id === client.user.id){
            conversation.push({
                role: 'assistant',
                name: username,
                content: msg.content,
            });

            return;
        }

        conversation.push({
            role: 'user',
            name: username,
            content: msg.content,
        })

    });

    const response = await openai.chat.completions.create({
        model: 'gpt-4-1106-preview',
        messages: conversation,
    })
    .catch((error) => console.error('OpenAI Error:\n', error));

    clearInterval(sendTypingInterval);

    if (!response){
        message.reply("I am having some trouble with the OpenAI API. Please try again later.");
        return;
    }

    const responseMessage = response.choices[0].message.content;
    const chunkSizeLimit = 2000;

    for (let i = 0; i <responseMessage.length; i += chunkSizeLimit){
        const chunk = responseMessage.substring(i, i + chunkSizeLimit);

        await message.reply(chunk);
    }

    
})

//Reminder Functionality

const remindSchema = require('./Schemas/remindSchema');

setInterval(async () => {

    const reminders = await remindSchema.find();

    if(!reminders) return;
    else {
        reminders.forEach( async reminder => {
            if(reminder.Time > Date.now()) return;

            // const user = await client.users.fetch(reminder.User);

            // user?.send({
            //     content: `${user}, you asked me to remind you about: \`${reminder.Remind}\``
            // }).catch(err => {return;});

            const guild = client.guilds.cache.get('735350360612405340');
            const channel = guild.channels.cache.get('1186317083395498024');
            const user = await client.users.fetch(reminder.User); // Fetch the user object

            const embed = new EmbedBuilder()
                .setDescription(`${user}, you asked me to remind you about: \`${reminder.Remind}\``)
                .setColor('#ff0000');

            channel?.send({ embeds: [embed], content: `:alarm_clock: Time's up, ${user}!` }).catch((err) => {
                console.error(err);
            });

            await remindSchema.deleteMany({
                Time: reminder.Time,
                User: reminder.User,
                Remind: reminder.Remind
            });

        })
    }

}, 1000 * 5);

// RICH PRESENCE FUNCTIONALITY

/*const USERID = '1059507080475725924';
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc' });

DiscordRPC.register(USERID);

async function activity() {
    if(!RPC) return;

    RPC.setActivity({
        details: 'Declassified Crib Bot',
        state: 'RPC STATE',
        largeImageKey: 'https://cdn.discordapp.com/avatars/1059507080475725924/b5bdad0b5c40c8ad456d51f7af5e1c3c.png?size=4096',
        largeImageText: 'Large Image Text',
        smallImageKey: 'https://images-ext-1.discordapp.net/external/88hnkny9zo4W_3uJFMsjja4X2O0ZXLd-43mFhPZljnY/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1059507080475725924/b5bdad0b5c40c8ad456d51f7af5e1c3c.png',
        smallImageText: 'Small Image Text',
        instance: false,
        startTimestamp: Date.now(),
        buttons: [
            {
                label: `Discord Server`,
                url: `https://discord.com/invite/83buvaqQp8`
            },
            {
                label: `Portfolio`,
                url: `https://google.com/`
            }
        ]

    })
}

RPC.on("ready", async () => {
    console.log("RPC Presence is up!");
    activity();

    setInterval(() => {
        activity();
    }, 10000000);
})

RPC.login({ clientId: USERID }).catch(err => console.error(err));*/

