import * as discord from 'discord.js';
import { apiBotEvent } from './index'


export interface apiMessage extends apiBotEvent{
    runEvent(message: discord.Message, client: discord.Client , guildConfig: any):Promise<void>
}

export interface apiMsg{
    runEvent(args: string[], message: discord.Message, client: discord.Client, guildConfig: any,):Promise<void>
}