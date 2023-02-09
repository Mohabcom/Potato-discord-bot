const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song.")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The song link or name.")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({
      fetchReply: true,
    });
    if (!interaction.member.voice.channel) {
      return interaction.editReply({
        content: `You must be in a voice channel to use this command.`,
      });
    }
    const { member, channel, client } = interaction;
    await client.distube.play(
      member.voice.channel,
      interaction.options.get("song").value,
      { textChannel: channel, member }
    );
    // console.log(client.distube.getQueue(interaction).songs.length);
    const numOfSongsInQueue = client.distube.getQueue(interaction).songs.length;
    const song =
      client.distube.getQueue(interaction).songs[numOfSongsInQueue - 1];
    if (numOfSongsInQueue === 1) {
      interaction.editReply({
        content: `🎶 Playing \`${song.name}\` - \`${song.formattedDuration}\`\n~by: ${song.user}`,
      });
    } else {
      interaction.editReply({
        content: `✔️| Song Added: \`${song.name}\` - \`${song.formattedDuration}\`\n~by: ${song.user}`,
      });
    }
  },
};
