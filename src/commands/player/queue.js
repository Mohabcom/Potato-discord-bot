const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Views the current Queue."),
  async execute(interaction) {
    await interaction.deferReply({
      fetchReply: true,
    });
    const client = interaction.client
    const queue = await client.distube.getQueue(interaction);
    if (!queue) {
      return interaction.editReply(`There is nothing playing!`);
    }
    const q = queue.songs
      .map((song, i) =>`${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n");
    interaction.editReply(`**Server Queue**\n${q}`);
  },
};

