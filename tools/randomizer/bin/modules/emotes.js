"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emotes_1 = require("../parsers/emotes");
const pick_1 = require("../utils/pick");
class ChatterEmotesRandomizer {
    constructor() {
        this.command = "emotes";
        this.helpText = "Randomizes chatter_emotes.json. Shuffles emotes around and randomizes HP types.";
    }
    operation() {
        const emotesParser = new emotes_1.default("controller/chatter_emotes.json");
        const emoteDict = emotesParser.data;
        console.log("Randomizing Chatter Emotes");
        const values = (0, pick_1.Shuffle)(Object.values(emoteDict));
        const hpTypes = (0, pick_1.Shuffle)(values.map(v => ({ type: v.hpTypeName, id: v.hpTypeId })));
        Object.keys(emoteDict).forEach(k => {
            emoteDict[k] = values.pop();
            const hp = hpTypes.shift();
            emoteDict[k].hpTypeId = hp.id;
            emoteDict[k].hpTypeName = hp.type;
        });
        emotesParser.data = emoteDict;
        console.log("Finished.");
    }
}
exports.default = ChatterEmotesRandomizer;
