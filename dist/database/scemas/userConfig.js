"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guildConfigDb = void 0;
const mongoose_1 = require("mongoose");
exports.guildConfigDb = mongoose_1.model('GuildConfig', new mongoose_1.Schema({
    userId: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        unique: true
    },
    silverCoins: {
        type: mongoose_1.SchemaTypes.Number,
        required: true,
        default: 0,
    },
    goldCoins: {
        type: mongoose_1.SchemaTypes.Number,
        required: true,
        default: 0,
    },
}));
