const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the player."),
  async execute(interaction) {
    const { client } = interaction;
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: `❌| There is nothing in the queue right now!`,
      });
    if (queue.paused) {
      queue.resume();
      return interaction.reply({
        content: "⏯️| Song Resumed",
      });
    }
    queue.pause();
    interaction.reply({
      content: "⏸️| Song Paused",
    });
  },
};