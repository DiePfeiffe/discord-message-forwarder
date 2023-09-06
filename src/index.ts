import {
    Client,
    IntentsBitField,
    Message,
    WebhookClient
} from 'discord.js';

require('dotenv').config();

const MessageForwards = JSON.parse(process.env.FORWARD_CONFIG || "{}");
const FractionTag = process.env.FRACTION_TAG || "";
if (MessageForwards === {}) {
    console.error("Ungültige/fehlende Konfiguration MESSAGE_FORWARDS");
    process.exit(1);
}
if (FractionTag === "") {
    console.error("Ungültige/fehlende Konfiguration FRACTION_TAG // Du musst eine Kennung für deine Fraktion angeben");
    process.exit(1);
}

const discord = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
discord.login(process.env.DISCORD_TOKEN);
discord.on('ready', (client: Client) => {
    if (!discord.user) return;
    console.log(`Logged in as ${discord.user.tag}!`);
    discord.user.setPresence({
        activities: [{name: `Leitet Nachrichten weiter`}],
        status: 'online'
    });
});
discord.on('messageCreate', async (message: Message) =>{
    if (message.author.bot || MessageForwards[message.channelId] === undefined) return;
    console.log(`Forwarding FFW Message from ${message.author.username} to FFW Discords`);
    for (let webhookURL of MessageForwards[message.channelId]) {
        const webhookClient = new WebhookClient({url: webhookURL});
        await webhookClient.send({
            content: message.content,
            username: `${message.member?.displayName || message.author.username} (${FractionTag})`,
            // Avatar des Nutzers, sonst RD-Logo, sonst undefined
            avatarURL: message.author.avatarURL() || discord.user?.avatarURL() || undefined,
            files: message.attachments.map(a => a.url),
        });
    }
});
discord.on('error', console.error);
