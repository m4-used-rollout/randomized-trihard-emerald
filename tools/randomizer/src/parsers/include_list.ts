import ReadOnlyParser from "./readonlyparser"

export default class IncludeListParser<T, P extends ReadOnlyParser<T>> extends ReadOnlyParser<P[]> {
    constructor(filename: string, private parser: { new(filename: string): P }) {
        super(filename);
    }
    protected fromFile(file: string[]): P[] {
        return file.filter(l => l.trim().toUpperCase().startsWith("INCLUDE"))
            .map(l => new this.parser(/INCLUDE "(.+?)"/i.exec(l)[1]));
    }
    public test(index = 0): void {
        try {
            this.data[index].test();
        }
        catch (e) {
            console.dir(this.data[index]);
            throw e;
        }
    }    
}