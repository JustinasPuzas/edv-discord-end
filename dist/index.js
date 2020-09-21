"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./dist/bot.js', {
    token: config_1.botConfig.token,
    totalShards: 2
});
manager.on('shardCreate', (shard) => {
    console.log(`Launched shard ${shard.id}`);
});
manager.spawn();
