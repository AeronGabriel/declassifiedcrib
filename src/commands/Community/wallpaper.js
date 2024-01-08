const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const axios = require('axios');

api = 'i5vq84o7cnhrPJB6qP4Qu7rfGXmmgfq8'; //Your wallhaven api


module.exports = {
  data: new SlashCommandBuilder()
    .setName("wallpaper-gen")
    .setDescription("Generate wallpapers")
    .setDMPermission(false)
    .addStringOption((option) =>
      option.setName("search")
        .setDescription("Search for a specific image.")
        .setRequired(true))
    .addStringOption(CategoryOption())
    .addStringOption(PurityOption())
    .addStringOption(RatiosOption())
    .addStringOption(SortingOption())
    .addStringOption(ColorOption())
    .addStringOption(AIFilterOption())
  ,
  /**
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    const { options } = interaction;
    try {
      const query = options.getString("search").replace(" ", "+") || null;
      const categoryCode = options.getString("category") || '111';
      const purityCode = options.getString("purity") || '100';
      const ratios = options.getString("ratios") || '';
      let sortingMethod = options.getString("sorting") || 'random';
      const colorCode = options.getString("color") || '';
      const ai_filter = options.getString("ai_filter") || '0';

      if (!query) {
        await interaction.reply("Please provide a search query.");
        return;
      }

      if (!api && purityCode === '001') {
        await interaction.reply("NSFW options are not available without a valid API key.");
        return;
      }
      
      if (sortingMethod === 'toplist') {
          sortingMethod = '&topRange=1y&sorting=toplist';
      } 

      const baseUrl = api ? `https://wallhaven.cc/api/v1/search?apikey=${api}&` : `https://wallhaven.cc/api/v1/search?`;
      const apiUrl = `${baseUrl}q=${query}&categories=${categoryCode}&purity=${purityCode}&ratios=${ratios}&sorting=${sortingMethod}&colors=${colorCode}&ai_art_filter=${ai_filter}`;

      const response = await axios.get(apiUrl);
      const msg = response.data.data[0].path;
      interaction.reply(msg);

    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          await interaction.reply("API rate limit reached. Please wait before making another request.");
        } else if (error.response.status === 401) {
          await interaction.reply("Unauthorized. Please check your API key.");
        }
      } else {
        console.error("Error fetching Wallhaven API:", error.message);
        await interaction.reply("An error occurred while fetching the image. Please try again later.");
      }
    }
  }
}

function CategoryOption() {
  return (option) =>
    option.setName("category")
      .setDescription("The category of the image")
      .addChoices(
        { name: 'People', value: '001' },
        { name: 'Anime', value: '010' },
        { name: 'General', value: '100' },
      );
}

function PurityOption() {
  return (option) =>
    option.setName("purity")
      .setDescription("The purity of the image")
      .addChoices(
        { name: 'sfw', value: '100' },
        { name: 'sketchy', value: '010' },
        { name: 'nsfw', value: '001' },
      );
}

function RatiosOption() {
  return (option) =>
    option.setName("ratios")
      .setDescription("Aspect ratios of the image")
      .addChoices(
        { name: 'Landscape', value: 'landscape' },
        { name: 'Portrait', value: 'portrait' },
      );
}

function SortingOption() {
  return (option) =>
    option.setName("sorting")
      .setDescription("Method of sorting results")
      .addChoices(
        { name: 'Date', value: 'date_added' },
        { name: 'Relevance', value: 'relevance' },
        { name: 'Random', value: 'random' },
        { name: 'Views', value: 'views' },
        { name: 'Favorites', value: 'favorites' },
        { name: 'Top list', value: 'toplist' },
        { name: 'Hot', value: 'hot' },
      );
}

function ColorOption() {
  return (option) =>
    option.setName("color")
      .setDescription("Search by color")
      .addChoices(
        { name: 'Blood red', value: '660000' },
        { name: 'Crimson Red', value: '990000' },
        { name: 'Racing Red (Rosso Corsa)', value: 'cc0000' },
        { name: 'Persian Red', value: 'cc3333' },
        { name: 'Violet Red', value: 'ea4c88' },
        { name: 'Vivid Violet', value: '993399' },
        { name: 'Rebecca Purple', value: '663399' },
        { name: 'Cosmic Cobalt', value: '333399' },
        { name: 'Bright Navy Blue', value: '0066cc' },
        { name: 'Pacific Blue', value: '0099cc' },
        { name: 'Medium Turquoise', value: '66cccc' },
        { name: 'Yellow Green', value: '77cc33' },
        { name: 'Olive Drab', value: '669900' },
        { name: 'Dark Green', value: '336600' },
        { name: 'Antique Bronze', value: '666600' },
        { name: 'Brass', value: '999900' },
        { name: 'Mustard Green', value: 'cccc33' },
        { name: 'Yellow', value: 'ffff00' },
        { name: 'Sunglow', value: 'ffcc33' },
        { name: 'Orange Peel', value: 'ff9900' },
        { name: 'Orange (Crayola)', value: 'ff6600' },
        { name: 'Golden brown', value: '996633' },
        { name: 'Black', value: '000000' },
        { name: 'Spanish Gray', value: '999999' },
        { name: 'Peacoat', value: '424153' },
      );
}

function AIFilterOption() {
  return (option) =>
    option.setName("ai_filter")
      .setDescription("AI filter")
      .addChoices(
        { name: 'Show AI art', value: '0' },
        { name: 'Block AI art', value: '1' },
      );
}

//2katbxFWcA