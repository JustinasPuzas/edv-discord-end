import * as mongoose from 'mongoose';
import * as discord from 'discord.js';
import { botConfig } from './config';

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./dist/bot.js', { 
    token: botConfig.token,
    totalShards: 2

});

manager.on('shardCreate', (shard: discord.Shard) => {
    console.log(`Launched shard ${shard.id}`)
});

manager.spawn();