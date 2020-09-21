"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const guildConfig_1 = require("../../database/schemas/guildConfig");
class guildCreate {
    constructor() {
        this._name = 'guildCreate';
    }
    runEvent(guild, client, guildConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if has admin if no return msg with corect invite link or sugest giving admin perms to bot role
            //log into db
            const isGuild = yield guildConfig_1.guildConfigDb.findOne({ guildId: guild.id });
            console.log(isGuild);
            if (!isGuild)
                yield guildConfig_1.guildConfigDb.create({ guildId: guild.id }).catch(err => { console.error(err); });
            //add to guildConfigs file aka cache
            //setup process
            console.log(guild.name);
            console.log(`joined guild on shard ${guild.shard.id} now shard has ${client.guilds.cache.size} guilds`);
            return;
        });
    }
}
exports.default = guildCreate;
