const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the player."),
  async execute(interaction) {
    const { client } = interaction;
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: `❌| There is nothing playing!`,
      });
    queue.stop();
    interaction.reply({ content: `✔️ Stopped!` });
  },
};
