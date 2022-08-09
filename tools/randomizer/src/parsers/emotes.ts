import ChatterEmotes from "../models/chatter_emotes";
import ReadWriteParser from "./readwriteparser"

export default class ChattyEmotesParser extends ReadWriteParser<ChatterEmotes> {
    protected toFile(data: ChatterEmotes): string[] {
        return JSON.stringify(data, null, 2).split('\n');
    }
    protected fromFile(file: string[]): ChatterEmotes {
        return JSON.parse(file.join('\n'));
    }

}