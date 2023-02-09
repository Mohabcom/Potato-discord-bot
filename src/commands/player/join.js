const { Constants } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Make the bot join a voice channel.")
    .addStringOption((option) =>
      option.setName("channel").setDescription("The voice channel id.")
    ),
  async execute(interaction) {
    let argChannel = "";
    let memberChannel = "";
    let voiceChannel = "";
    try {
      memberChannel = interaction.member.voice.channel;
      argChannel = await interaction.options.get("channel").value;
    } catch (error) {
      // console.log(error);
    }
    if (!memberChannel && !argChannel) {
      return interaction.reply({
        content: `❌ You must be in a voice channel or enter a voice channel id!`,
      });
    } else if (argChannel) {
      try {
        voiceChannel = await interaction.client.channels.fetch(argChannel);
      } catch (error) {
        // console.log(error);
        return interaction.reply({
          content: `❌ ${argChannel} is not a valid voice channel!`,
        });
      }
    } else if (memberChannel) {
      voiceChannel = memberChannel;
    }
    interaction.client.distube.voices.join(voiceChannel);
    interaction.reply({
      content: `✔️ Joined Voice Channel ${voiceChannel.name}.`,
    });
  },
};
