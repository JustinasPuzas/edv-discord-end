import { apiGuildCreate } from '../../apis/index'
import { guildConfigDb } from '../../database/schemas/guildConfig'
import * as discord from 'discord.js'

export default class guildCreate implements apiGuildCreate {
    readonly  _name = 'guildCreate'

    
    async runEvent(guild:discord.Guild, client:discord.Client, guildConfig:any,): Promise<void>{
        //check if has admin if no return msg with corect invite link or sugest giving admin perms to bot role

        //log into db
        const isGuild = await guildConfigDb.findOne({guildId: guild.id})
        console.log(isGuild)
        if(!isGuild) 
            await guildConfigDb.create({guildId: guild.id}).catch( err => { console.error(err)})
        //add to guildConfigs file aka cache
        //setup process

        console.log(guild.name)
        console.log(`joined guild on shard ${guild.shard.id} now shard has ${client.guilds.cache.size} guilds`)
        return;
    }
}