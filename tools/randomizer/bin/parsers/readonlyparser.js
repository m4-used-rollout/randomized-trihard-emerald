"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
class ReadOnlyParser {
    constructor(filename) {
        filename = (0, path_1.resolve)(filename);
        if (!(0, fs_1.existsSync)(filename))
            throw new Error(`File "${filename}" does not exist`);
        this.filename = filename;
    }
    get fileContents() {
        return (0, fs_1.readFileSync)(this.filename).toString().split("\n");
    }
    readIn(fileContents) {
        return this.fromFile(fileContents);
    }
    get data() {
        this.parsedData = this.parsedData || this.readIn(this.fileContents);
        return this.parsedData;
    }
}
exports.default = ReadOnlyParser;
