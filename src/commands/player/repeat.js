const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription("Change repeat mode.")
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("Choose repeat mode option.")
        .setRequired(true)
			  .addChoices(
				{ name: 'Off', value: 'off' },
				{ name: 'Song', value: 'song' },
				{ name: 'Queue', value: 'queue' },
			)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: `❌| There is nothing playing!`,
      });

    let mode = null;
    switch (interaction.options.get("mode").value) {
      case "off":
        mode = 0;
        break;
      case "song":
        mode = 1;
        break;
      case "queue":
        mode = 2;
        break;
    }
        mode = queue.setRepeatMode(mode);
        mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";
    interaction.reply({ content: `🔁 Set repeat mode to \`${mode}\`` });
  },
};