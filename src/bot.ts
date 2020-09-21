import * as discord from 'discord.js';
import { connect } from 'mongoose';
import express from 'express';
import cors from 'cors';

import * as load from './utils/registry';
import { botConfig } from './config';
import { guildConfigDb } from './database/schemas/guildConfig'
import { router } from './api/index';

import { apiBotEvent,
    apiGuildCreate,
    apiMessage
} from './apis/index';

const guildConfig:Map<string,any> = new Map();

export async function getGuilds(guildId: string, prefix: string) {
    var guild = guildConfig.get(`${guildId}`)
    console.log( guild.prefix )

    if(guild){
        guild.prefix = prefix
        console.log(`Pavyko uwu`)
    }else{
        return
    }
}

const events: Map<string, apiBotEvent> = new Map();
const client = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'] });

const app = express();
const PORT = botConfig.PORT +(client.shard as discord.ShardClientUtil).ids[0]

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use( cors({
    origin: botConfig.backEndUrl,
}));

app.use(`/api`, router);

client.on('ready',async () => {
    console.log((client.shard as discord.ShardClientUtil).ids)
    console.log(`shard #${(client.shard as discord.ShardClientUtil).ids} starting...`);

    try{
        await connect( `${botConfig.dataBase}`, {
            //authMechanism: "DEFAULT",
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }catch (err) {
        console.log(`shard #${(client.shard as discord.ShardClientUtil).ids} had a database error: `);
        console.log(err);
        return;
    }

    try{
        for(let guild of client.guilds.cache){
            guildConfig.set(guild[0] ,await guildConfigDb.findOne({guildId: guild[0]}))
        }
        //load cache
        //load commands
        //load emotes
        //...
    }catch (err){
        console.log(`shard #${(client.shard as discord.ShardClientUtil).ids} had a loading... , error: `);
        console.error(err);
        return;
    }

    try{
        await load.registerEvents(events, client)
    }catch (err){
        console.log(`shard #${(client.shard as discord.ShardClientUtil).ids} had a loading event, error: `);
        console.error(err);
        return;
    }

    console.log(`shard #${(client.shard as discord.ShardClientUtil).ids} is ready to serve in ${client.guilds.cache.size} guilds`);
});

client.on('message', async (message: discord.Message)  => {
    if(events.get('message') === undefined) return console.log(`message event wasn't loaded yet`);

    try{
        let event = events.get(`message`) as apiMessage
        if(message.guild){
            await event.runEvent(message,client, guildConfig.get(`${message.guild.id}`))
        }else{
            console.log(`not in guild :/`)
        }
    }catch (err){
        console.error(err)
    }
});

client.on('guildCreate', async (guild: discord.Guild) => {
    if(events.get('message') === undefined) return console.log(`guildCreate event wasn't loaded yet`);

    try{
        let event = events.get(`guildCreate`) as apiGuildCreate
        await event.runEvent(guild, client, undefined)
    }catch (err){
        console.error(err)
    }
});

app.listen(PORT, () => console.log(`Running on Port : ${PORT}`));

client.login(botConfig.token);