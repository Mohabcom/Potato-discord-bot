const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rewind")
    .setDescription("Rewinds back provided time.")
    .addNumberOption((option) =>
      option
        .setName("seconds")
        .setDescription("Time to rewind in seconds.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: `❌| There is nothing in the queue right now!`,
      });
    const time = interaction.options.get("seconds").value;
    queue.seek(queue.currentTime - time);
    interaction.reply({ content: `Rewinded the song for ${time}!` });
  },
};
