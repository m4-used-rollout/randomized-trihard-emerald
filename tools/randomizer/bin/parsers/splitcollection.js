"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PartialCollection {
    constructor(parser) {
        this.parser = parser;
        this.collection = parser.data;
    }
    get length() {
        return this.collection.length;
    }
    update(index, item) {
        this.collection[index] = item;
        this.parser.data = this.collection;
    }
    testShallowCompare(index, item) {
        let matching = item == this.collection[index];
        if (typeof item === "object") {
            matching = Object.keys(item).every(k => item[k] == this.collection[index][k]);
        }
        if (matching)
            return;
        console.dir(this.collection[index]);
        console.dir(item);
        throw new Error(`Item at index ${index} does not match new item`);
    }
}
class SplitCollectionParser {
    constructor(filenames, parser) {
        this.filenames = filenames;
        this.partials = filenames.map(f => new PartialCollection(new parser(f)));
    }
    get data() {
        return this.partials.reduce((all, cur) => all.concat(...cur.collection), new Array());
    }
    update(index, item) {
        let p;
        for (p = 0; p < this.partials.length && index >= this.partials[p].length; p++)
            index -= this.partials[p].length;
        this.partials[p].update(index, item);
    }
    test(index = this.partials[0].length) {
        const item = this.data[index];
        let p;
        for (p = 0; p < this.partials.length && index >= this.partials[p].length; p++)
            index -= this.partials[p].length;
        this.partials[p].testShallowCompare(index, item);
    }
}
exports.default = SplitCollectionParser;
