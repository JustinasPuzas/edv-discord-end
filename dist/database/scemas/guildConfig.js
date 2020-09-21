"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guildConfigDb = void 0;
const mongoose_1 = require("mongoose");
exports.guildConfigDb = mongoose_1.model('GuildConfig', new mongoose_1.Schema({
    guildId: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        unique: true,
    },
    prefix: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        default: "!",
    },
    defaultRole: {
        type: mongoose_1.SchemaTypes.String,
        required: false,
    },
    silverCoins: {
        type: mongoose_1.SchemaTypes.Number,
        required: true,
        default: 500,
    },
    goldCoins: {
        type: mongoose_1.SchemaTypes.Number,
        required: true,
        default: 100,
    },
    silverLog: {
        type: mongoose_1.SchemaTypes.Array,
        required: true,
        default: [{
                amount: 500,
                from: '',
                date: Date.now(),
                note: 'For Guild Creation from IGORIS#1569 uwu'
            }]
    },
    goldLog: {
        type: mongoose_1.SchemaTypes.Array,
        required: true,
        default: [{
                amount: 100,
                from: '',
                date: Date.now(),
                note: 'For Guild Creation from IGORIS#1569 uwu'
            }]
    },
    voiceModuleOn: {
        type: mongoose_1.SchemaTypes.Boolean,
        required: true,
        default: true,
    },
    voiceModule: {
        type: mongoose_1.SchemaTypes.Array,
        required: false,
    },
    panelModuleOn: {
        type: mongoose_1.SchemaTypes.Boolean,
        required: true,
        default: true,
    },
    panelModule: {
        type: Array,
        required: false,
    }
}));
