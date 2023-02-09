const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Make the bot leave the voice channel."),
  async execute(interaction) {
    interaction.client.distube.voices.leave(message);
  },
};
