const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Check AerixHosting bot performance",

  callback: async (client, interaction) => {

    const botLatency = Date.now() - interaction.createdTimestamp;
    const apiPing = client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor("#00b0f4")
      .setAuthor({
        name: "AerixHosting • System Status",
        iconURL: client.user.displayAvatarURL()
      })
      .setTitle("⚡ Network Response")
      .setDescription(
`> High performance hosting powered by **AerixHosting Philippines**

\`\`\`yaml
Command: /ping
Status : Online
\`\`\``
      )
      .addFields(
        {
          name: "🤖 Bot Latency",
          value: `\`\`\`fix\n${botLatency}ms\n\`\`\``,
          inline: true
        },
        {
          name: "🌐 API Latency",
          value: `\`\`\`fix\n${apiPing}ms\n\`\`\``,
          inline: true
        },
        {
          name: "🚀 Hosting",
          value: "```css\nAerixHosting Philippines\n```",
          inline: true
        }
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({
        text: "AerixHosting • Fast • Reliable • Powerful",
        iconURL: client.user.displayAvatarURL()
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

  }
};
