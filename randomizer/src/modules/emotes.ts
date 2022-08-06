import ChattyEmotesParser from "../parsers/emotes";
import { Shuffle } from "../utils/pick";

export default class ChatterEmotesRandomizer implements RandoModule {
    command = "emotes"
    helpText = "Randomizes chatter_emotes.json. Shuffles emotes around and randomizes HP types.";
    operation() {
        const emotesParser = new ChattyEmotesParser("controller/chatter_emotes.json");
        const emoteDict = emotesParser.data;

        console.log("Randomizing Chatter Emotes");
        const values = Shuffle(Object.values(emoteDict));
        const hpTypes = Shuffle(values.map(v => ({ type: v.hpTypeName, id: v.hpTypeId })));

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