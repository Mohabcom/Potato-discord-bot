const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Seek to provided time.")
    .addNumberOption((option) =>
      option
        .setName("seconds")
        .setDescription("Position to seek to in seconds.")
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
    queue.seek(time);
    interaction.reply({ content: `Seeked to the second ${time}!` });
  },
};