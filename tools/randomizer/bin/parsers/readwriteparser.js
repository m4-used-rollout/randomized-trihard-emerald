"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diff_1 = require("diff");
const fs_1 = require("fs");
const readonlyparser_1 = require("./readonlyparser");
class ReadWriteParser extends readonlyparser_1.default {
    writeOut() {
        (0, fs_1.writeFileSync)(this.filename, this.toFile(this.parsedData).join('\n'));
    }
    get data() {
        return super.data;
    }
    set data(data) {
        this.parsedData = data;
        this.writeOut();
    }
    test() {
        const input = this.fileContents;
        const data = this.readIn(input);
        this.parsedData = data;
        const output = this.toFile(data);
        const diff = (0, diff_1.diffLines)(input.join('\n'), output.join('\n'));
        if (diff.some(d => d.added || d.removed)) {
            console.error(diff);
            throw new Error(`Failed to match input/output for ${this.filename}`);
        }
    }
}
exports.default = ReadWriteParser;
