const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Changes the player volume.")
    .addNumberOption((option) =>
      option
        .setName("percentage")
        .setDescription("The volume percentage.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: `❌ There is nothing in the queue right now!`,
      });
    const volume = interaction.options.get("percentage").value
    queue.setVolume(volume);
    interaction.reply({
      content: `✔️ | Volume set to \`${volume}\``,
    });

  },
};