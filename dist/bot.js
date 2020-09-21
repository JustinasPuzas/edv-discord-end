"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuilds = void 0;
const discord = __importStar(require("discord.js"));
const mongoose_1 = require("mongoose");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const load = __importStar(require("./utils/registry"));
const config_1 = require("./config");
const guildConfig_1 = require("./database/schemas/guildConfig");
const index_1 = require("./api/index");
const guildConfig = new Map();
function getGuilds(guildId, prefix) {
    return __awaiter(this, void 0, void 0, function* () {
        var guild = guildConfig.get(`${guildId}`);
        console.log(guild.prefix);
        if (guild) {
            guild.prefix = prefix;
            console.log(`Pavyko uwu`);
        }
        else {
            return;
        }
    });
}
exports.getGuilds = getGuilds;
const events = new Map();
const client = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'] });
const app = express_1.default();
const PORT = config_1.botConfig.PORT + client.shard.ids[0];
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default({
    origin: config_1.botConfig.backEndUrl,
}));
app.use(`/api`, index_1.router);
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(client.shard.ids);
    console.log(`shard #${client.shard.ids} starting...`);
    try {
        yield mongoose_1.connect(`${config_1.botConfig.dataBase}`, {
            //authMechanism: "DEFAULT",
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (err) {
        console.log(`shard #${client.shard.ids} had a database error: `);
        console.log(err);
        return;
    }
    try {
        for (let guild of client.guilds.cache) {
            guildConfig.set(guild[0], yield guildConfig_1.guildConfigDb.findOne({ guildId: guild[0] }));
        }
        //load cache
        //load commands
        //load emotes
        //...
    }
    catch (err) {
        console.log(`shard #${client.shard.ids} had a loading... , error: `);
        console.error(err);
        return;
    }
    try {
        yield load.registerEvents(events, client);
    }
    catch (err) {
        console.log(`shard #${client.shard.ids} had a loading event, error: `);
        console.error(err);
        return;
    }
    console.log(`shard #${client.shard.ids} is ready to serve in ${client.guilds.cache.size} guilds`);
}));
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (events.get('message') === undefined)
        return console.log(`message event wasn't loaded yet`);
    try {
        let event = events.get(`message`);
        if (message.guild) {
            yield event.runEvent(message, client, guildConfig.get(`${message.guild.id}`));
        }
        else {
            console.log(`not in guild :/`);
        }
    }
    catch (err) {
        console.error(err);
    }
}));
client.on('guildCreate', (guild) => __awaiter(void 0, void 0, void 0, function* () {
    if (events.get('message') === undefined)
        return console.log(`guildCreate event wasn't loaded yet`);
    try {
        let event = events.get(`guildCreate`);
        yield event.runEvent(guild, client, undefined);
    }
    catch (err) {
        console.error(err);
    }
}));
app.listen(PORT, () => console.log(`Running on Port : ${PORT}`));
client.login(config_1.botConfig.token);
