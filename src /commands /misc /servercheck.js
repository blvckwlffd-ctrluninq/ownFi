const { EmbedBuilder } = require("discord.js");
const util = require("minecraft-server-util");

module.exports = {
  name: "mvstatus",
  description: "Check Minecraft server status",

  callback: async (client, interaction) => {

    const host = "play.example.com"; // change this
    const port = 25565;

    try {

      const res = await util.status(host, port);

      const embed = new EmbedBuilder()
        .setColor("#00b0f4")
        .setAuthor({
          name: "AerixHosting Server Monitor",
          iconURL: client.user.displayAvatarURL()
        })
        .setTitle("🟢 Minecraft Server Online")
        .setThumbnail(`https://api.mcsrvstat.us/icon/${host}`)
        .setDescription(
`> Real-time server status powered by **AerixHosting**

\`\`\`yaml
Server IP : ${host}
Port      : ${port}
Status    : Online
\`\`\``
        )
        .addFields(
          {
            name: "👥 Players",
            value: `\`\`\`${res.players.online}/${res.players.max}\`\`\``,
            inline: true
          },
          {
            name: "⚙️ Version",
            value: `\`\`\`${res.version.name}\`\`\``,
            inline: true
          },
          {
            name: "📡 Ping",
            value: `\`\`\`${res.roundTripLatency}ms\`\`\``,
            inline: true
          }
        )
        .setFooter({
          text: "AerixHosting • Game Server Monitoring"
        })
        .setTimestamp();

      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      });

    } catch {

      const embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("🔴 Minecraft Server Offline")
        .setThumbnail(`https://api.mcsrvstat.us/icon/${host}`)
        .setDescription(
`The server **${host}** is currently **offline** or unreachable.`
        )
        .setFooter({
          text: "AerixHosting • Server Monitor"
        });

      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      });

    }

  }
};
