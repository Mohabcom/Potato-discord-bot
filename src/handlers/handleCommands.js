const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Exporting everything as function to pass in the client variable

module.exports = (client) => {
  client.handleCommands = async () => {
    const commands = [];
    // Grab all the command files from the commands directory created earlier

    const commandsPath = path.join(__dirname, "../commands");
    const commandsFolders = fs.readdirSync(commandsPath);

    for (const folder of commandsFolders) {
      // Grab all the command files from the commands directory
      const commandFiles = fs
        .readdirSync(path.join(commandsPath, folder))
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, folder, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
          // Set a new item in the Collection with the key as the command name and the value as the exported module

          client.commands.set(command.data.name, command);

          // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment

          commands.push(command.data.toJSON());

          // console.log(
          // `[SUCCESS] The command at ${file} has been added successfully`
          // );
        } else {
          console.log(
            `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`
          );
        }
      }
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    // Deploying commands
    (async () => {
      try {
        console.log(
          `Started refreshing ${commands.length} application (/) commands.`
        );

        const data = await rest.put(
          Routes.applicationCommands(process.env.CLIENT_ID),
          {
            body: commands,
          }
        );

        console.log(
          `Successfully reloaded ${data.length} application (/) commands.`
        );
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
