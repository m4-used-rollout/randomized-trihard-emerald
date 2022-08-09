"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readonlyparser_1 = require("./readonlyparser");
class IncludeListParser extends readonlyparser_1.default {
    constructor(filename, parser) {
        super(filename);
        this.parser = parser;
    }
    fromFile(file) {
        return file.filter(l => l.trim().toUpperCase().startsWith("INCLUDE"))
            .map(l => new this.parser(/INCLUDE "(.+?)"/i.exec(l)[1]));
    }
    test(index = 0) {
        try {
            this.data[index].test();
        }
        catch (e) {
            console.dir(this.data[index]);
            throw e;
        }
    }
}
exports.default = IncludeListParser;
