import ReadWriteParser from "./readwriteparser";

class PartialCollection<T, P extends ReadWriteParser<T[]>> {
    collection: T[];
    get length() {
        return this.collection.length;
    }

    update(index: number, item: T) {
        this.collection[index] = item;
        this.parser.data = this.collection;
    }

    testShallowCompare(index: number, item: T) {
        let matching = item == this.collection[index];
        if (typeof item === "object") {
            matching = Object.keys(item).every(k => item[k] == this.collection[index][k]);
        }
        if (matching)
            return;
        console.dir(this.collection[index])
        console.dir(item);
        throw new Error(`Item at index ${index} does not match new item`);
    }

    constructor(private parser: P) {
        this.collection = parser.data;
    }
}

export default class SplitCollectionParser<T, P extends ReadWriteParser<T[]>> {
    private partials: PartialCollection<T, P>[];
    constructor(public filenames: string[], parser: { new(filename: string): P }) {
        this.partials = filenames.map(f => new PartialCollection(new parser(f)));
    }

    get data() {
        return this.partials.reduce((all, cur) => all.concat(...cur.collection), new Array<T>());
    }

    update(index: number, item: T) {
        let p: number;
        for (p = 0; p < this.partials.length && index >= this.partials[p].length; p++)
            index -= this.partials[p].length;
        this.partials[p].update(index, item);
    }

    test(index = this.partials[0].length) {
        const item = this.data[index];
        let p: number;
        for (p = 0; p < this.partials.length && index >= this.partials[p].length; p++)
            index -= this.partials[p].length;
        this.partials[p].testShallowCompare(index, item);

    }
}