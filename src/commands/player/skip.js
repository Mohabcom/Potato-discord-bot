const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip current song."),
  async execute(interaction) {
    const {client} = interaction
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: `❌| There is nothing in the queue right now!`,
      });
    try {
      const song = await queue.skip();
      interaction.reply({
        content: `✔️| Skipped! Now playing:\n${song.name}`,
      });
    } catch (e) {
      interaction.reply({
        content: `Error: ${e}`,
      });
    }
  },
};
