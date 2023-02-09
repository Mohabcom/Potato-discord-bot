const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Toggle Autoplay."),
  async execute(interaction) {
    const { client } = interaction;
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: `❌| There is nothing in the queue right now!`,
      });
    const autoplay = queue.toggleAutoplay();
    interaction.reply({content: `$✔️ AutoPlay: \`${autoplay ? "On" : "Off"}\``});
  },
};