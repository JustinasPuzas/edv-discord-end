import {SchemaTypes , Schema, model} from 'mongoose';

export const guildConfigDb = model( 'GuildConfig', new Schema({
    userId: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    silverCoins:{
        type: SchemaTypes.Number,
        required: true,
        default: 0,
    },
    goldCoins:{
        type: SchemaTypes.Number,
        required: true,
        default: 0,
    },
    

  } ));