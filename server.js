import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import axios from 'axios'; 
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

const api_key = process.env.API_KEY;  
const token = process.env.DISCORD_TOKEN;

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
        try {
            const question = message.content;
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api_key}`,
                {
                    contents: [{ parts: [{ text: question }] }],
                }
            );
            const answer = response.data.candidates[0].content.parts[0].text;
            message.reply(answer);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            message.reply("An error occurred while fetching the response. Please try again.");
        }
    }
);

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "ping") {
        await interaction.reply("Pong!");
    } else if (commandName === "beep") {
        await interaction.reply("Boop!");
    } else if (commandName === "anas") {
        await interaction.reply("Genius!");
    }
});

client.login(token);
