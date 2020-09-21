import * as path from 'path'
import * as discord from 'discord.js'
import {  apiBotEvent,
          apiGuildCreate,
} from '../apis/index'
const fs = require('fs').promises;


export async function registerEvents(events: Map<string, apiBotEvent>, client: discord.Client, ):Promise<Map<string,apiBotEvent>>{
  const filePath = './dist/events';
  const folders = (await fs.readdir(filePath) as string[]).filter(item =>  !item.includes(`.`));
    for(let folder of folders){
      const event = await require(`${__dirname.replace(`src`,`dist`).replace(`utils`,`events`)}/${folder}/index`).default;
      console.log(event);
      const eve = new event();
      events.set(eve._name as string, eve);
    }
    return events
}

/*async function registerCommands(client: discord.Client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));
      if (Command.prototype instanceof BaseCommand) {
        const cmd = new Command();
        client.commands.set(cmd.name, cmd);
        cmd.aliases.forEach((alias) => {
          client.commands.set(alias, cmd);
        });
      }
    }
  }
}

async function registerEvents(client : discord.Client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));
      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        client.events.set(event.name, event);
        client.on(event.name, event.run.bind(event, client));
      }
    }
  }
}

module.exports = { 
  registerCommands, 
  registerEvents,
};*/