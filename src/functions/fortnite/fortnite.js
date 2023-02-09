const CronJob = require("cron").CronJob;
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

let scheduledMessage = new CronJob("01 00 02 * * *", () => {
  // client.on("messageCreate", async (message) => {
  //   if (message.author.bot || !message.guild) {
  //     return;
  //   }
  //   if (message.content === "?shop") {
  //     const dateEmbed = await getFortniteDateEmbed();
  //     const featuredEmbed = await getFortniteFeaturedEmbed()
  //     const dailyEmbed = await getFortniteDailyEmbed()
  //     const othersEmbed = await getFortniteSpecialFeaturedEmbed();
  //     await message.channel.send({ embeds: [dateEmbed] });
  //     await message.channel.send({ embeds: [featuredEmbed] });
  //     await message.channel.send({ embeds: [dailyEmbed] });
  //     await message.channel.send({ embeds: [othersEmbed] });
  //   }
  // });
});

const getShop = async () => {
  try {
    const shop = await axios
      .get("https://fortnite-api.com/v2/shop/br")
      .then(function (res) {
        const featuredAll = res.data.data.featured.entries;
        const featured = [];
        for (let i = 0; i < featuredAll.length; i++) {
          let item = { items: [], bundle: {} };
          item.bundle = featuredAll[i].bundle;
          item.items = featuredAll[i].items;
          item.price = featuredAll[i].finalPrice;
          featured.push(item);
        }

        const dailyAll = res.data.data.daily.entries;
        const daily = [];
        for (let i = 0; i < dailyAll.length; i++) {
          let item = { items: [], bundle: {} };
          item.bundle = dailyAll[i].bundle;
          item.items = dailyAll[i].items;
          item.price = dailyAll[i].finalPrice;
          daily.push(item);
        }

        const specialFeaturedAll = res.data.data.specialFeatured.entries;
        const specialFeatured = [];
        for (let i = 0; i < specialFeaturedAll.length; i++) {
          let item = { items: [], bundle: {} };
          item.bundle = specialFeaturedAll[i].bundle;
          item.items = specialFeaturedAll[i].items;
          item.price = specialFeaturedAll[i].finalPrice;
          specialFeatured.push(item);
        }
        return { date: res.data.data.date, featured, daily, specialFeatured };
      });
    //   console.log(shop);
    return shop;
  } catch (error) {
    console.log(error);
  }
};

scheduledMessage.start();


//
//  Embeds
//


const getFortniteDateEmbed = async () => {
  try {
    const shop = await getShop();

    const dateInMS = Date.parse(shop.date);
    const date = new Date(dateInMS);
    const embed = new EmbedBuilder()
      .setTitle(
        `Fortnite Item Shop ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      )
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png"
      )
      .addFields()
      .setURL("https://fnbr.co/shop")
      .setTimestamp();

    return embed;
  } catch (error) {
    console.log(error);
  }
};

const getFortniteFeaturedEmbed = async () => {
  try {
    const shop = await getShop();

    const dateInMS = Date.parse(shop.date);
    const date = new Date(dateInMS);
    const embed = new EmbedBuilder()
      .setTitle("Featured Section")
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png"
      )
      .addFields()
      .setURL("https://fnbr.co/shop");
    embed.data.fields.push({ name: "\u200B", value: "\u200B" });
    for (let i = 0; i < shop.featured.length; i++) {
      const obj = { name: "", value: "Price: ", inline: true };

      if (shop.featured[i].bundle) {
        let strArr = shop.featured[i].bundle.name.toLowerCase().split(" ");
        let capitalizeFirstLetters = [];

        for (let j = 0; j < strArr.length; j++) {
          const string = strArr[j].charAt(0).toUpperCase() + strArr[j].slice(1);
          capitalizeFirstLetters.push(string);
        }
        obj.name = capitalizeFirstLetters.join(" ");

        const priceValue = ["Price: "];
        priceValue.push(shop.featured[i].price);
        priceValue.push("V-Bucks");
        obj.value = priceValue.join(" ");
        embed.data.fields.push(obj);
      } else {
        obj.name = shop.featured[i].items[0].name;

        const priceValue = ["Price: "];
        priceValue.push(shop.featured[i].price);
        priceValue.push("V-Bucks");
        obj.value = priceValue.join(" ");

        embed.data.fields.push(obj);
      }
    }

    return embed;
  } catch (error) {
    console.log(error);
  }
};

const getFortniteDailyEmbed = async () => {
  try {
    const shop = await getShop();

    const dateInMS = Date.parse(shop.date);
    const date = new Date(dateInMS);
    const embed = new EmbedBuilder()
      .setTitle("Daily Section")
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png"
      )
      .addFields()
      .setURL("https://fnbr.co/shop");

    // daily data
    for (let i = 0; i < shop.daily.length; i++) {
      const obj = { name: "", value: "Price: ", inline: true };

      if (shop.daily[i].bundle) {
        let strArr = shop.daily[i].bundle.name.toLowerCase().split(" ");
        let capitalizeFirstLetters = [];

        for (let j = 0; j < strArr.length; j++) {
          const string = strArr[j].charAt(0).toUpperCase() + strArr[j].slice(1);
          capitalizeFirstLetters.push(string);
        }
        obj.name = capitalizeFirstLetters.join(" ");

        const priceValue = ["Price: "];
        priceValue.push(shop.daily[i].price);
        priceValue.push("V-Bucks");
        obj.value = priceValue.join(" ");

        embed.data.fields.push(obj);
      } else {
        obj.name = shop.daily[i].items[0].name;

        const priceValue = ["Price: "];
        priceValue.push(shop.daily[i].price);
        priceValue.push("V-Bucks");
        obj.value = priceValue.join(" ");

        embed.data.fields.push(obj);
      }
    }

    return embed;
  } catch (error) {
    console.log(error);
  }
};

const getFortniteSpecialFeaturedEmbed = async () => {
  try {
    const shop = await getShop();

    const dateInMS = Date.parse(shop.date);
    const date = new Date(dateInMS);
    const embed = new EmbedBuilder()
      .setTitle("Other Sections")
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png"
      )
      .addFields()
      .setURL("https://fnbr.co/shop");

    // specialFeatured data
    embed.data.fields.push({ name: "\u200B", value: "\u200B" });
    for (let i = 0; i < shop.specialFeatured.length; i++) {
      const obj = { name: "", value: "Price: ", inline: true };

      if (shop.specialFeatured[i].bundle) {
        let strArr = shop.specialFeatured[i].bundle.name
          .toLowerCase()
          .split(" ");
        let capitalizeFirstLetters = [];

        for (let j = 0; j < strArr.length; j++) {
          const string = strArr[j].charAt(0).toUpperCase() + strArr[j].slice(1);
          capitalizeFirstLetters.push(string);
        }
        obj.name = capitalizeFirstLetters.join(" ");

        const priceValue = ["Price: "];
        priceValue.push(shop.specialFeatured[i].price);
        priceValue.push("V-Bucks");
        obj.value = priceValue.join(" ");

        embed.data.fields.push(obj);
      } else {
        obj.name = shop.specialFeatured[i].items[0].name;

        const priceValue = ["Price: "];
        priceValue.push(shop.specialFeatured[i].price);
        priceValue.push("V-Bucks");
        obj.value = priceValue.join(" ");

        embed.data.fields.push(obj);
      }
    }

    return embed;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFortniteDateEmbed,
  getFortniteFeaturedEmbed,
  getFortniteDailyEmbed,
  getFortniteSpecialFeaturedEmbed,
};

