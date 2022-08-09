"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readwriteparser_1 = require("./readwriteparser");
class ChattyEmotesParser extends readwriteparser_1.default {
    toFile(data) {
        return JSON.stringify(data, null, 2).split('\n');
    }
    fromFile(file) {
        return JSON.parse(file.join('\n'));
    }
}
exports.default = ChattyEmotesParser;
