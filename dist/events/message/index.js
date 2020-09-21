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
class message {
    constructor() {
        this._name = 'message';
    }
    isThisEvent(event) {
        if (event === this._name)
            return true;
        else
            return false;
    }
    runEvent(message, client, guildConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            //parse msg divide into args mentions etc...
            //fix mentions listing in array
            //separat
            if (!message.author)
                return;
            if (message.author.bot)
                return;
            console.log(guildConfig.prefix);
            if (message.content.startsWith(guildConfig.prefix)) {
                console.log(`rabota uwu`);
            }
            return;
        });
    }
}
exports.default = message;
