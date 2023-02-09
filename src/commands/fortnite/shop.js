const { SlashCommandBuilder } = require("discord.js");

const {
  getFortniteDateEmbed,
  getFortniteFeaturedEmbed,
  getFortniteDailyEmbed,
  getFortniteSpecialFeaturedEmbed,
} = require("../../functions/fortnite/fortnite");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("shop")
		.setDescription("Replies with the current Fortnite item shop."),
  async execute(interaction) {
    await interaction.deferReply({
      fetchReply: true,
    });
    try {
      const dateEmbed = await getFortniteDateEmbed();
      const featuredEmbed = await getFortniteFeaturedEmbed();
      const dailyEmbed = await getFortniteDailyEmbed();
      const othersEmbed = await getFortniteSpecialFeaturedEmbed();

        await interaction.editReply("Fetching Item Shop...");
      // await interaction.reply("Fetching Item Shop");
      await interaction.channel.send({ embeds: [dateEmbed] });
      await interaction.channel.send({ embeds: [featuredEmbed] });
      await interaction.channel.send({ embeds: [dailyEmbed] });
      await interaction.channel.send({ embeds: [othersEmbed] });
    } catch (error) {
      console.log(error);
    await interaction.editReply("An Error Occurred Please Try Again Later");

    }
	}
};
