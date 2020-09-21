import * as discord from 'discord.js';
import { apiBotEvent } from './index'


export interface apiGuildCreate extends apiBotEvent{
    runEvent(guild: discord.Guild, client: discord.Client, guildConfig: any,):Promise<void>
}