import { apiMessage } from '../../apis/index'
import * as discord from 'discord.js'

export default class message implements apiMessage {
    readonly  _name = 'message'

    isThisEvent(event: string):boolean{
        if(event === this._name) return true;
        else return false;
    }
    
    async runEvent(message: discord.Message, client: discord.Client , guildConfig: any): Promise<void>{
        //parse msg divide into args mentions etc...
        //fix mentions listing in array
        //separat
        if(!message.author) return;
        if(message.author.bot) return;

        console.log(guildConfig.prefix)

        if(message.content.startsWith(guildConfig.prefix)){
            console.log(`rabota uwu`);
        }
        return;
    }
}