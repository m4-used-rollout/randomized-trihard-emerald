import { resolve } from "path";
import { existsSync, readFileSync } from "fs";

export default abstract class ReadOnlyParser<T> {
    constructor(filename: string) {
        filename = resolve(filename);
        if (!existsSync(filename))
            throw new Error(`File "${filename}" does not exist`);
        this.filename = filename;
    }

    protected abstract fromFile(file: string[]): T;

    public abstract test(): void;

    protected get fileContents() {
        return readFileSync(this.filename).toString().split("\n")
    }
    protected readIn(fileContents) {
        return this.fromFile(fileContents);
    }

    protected parsedData?: T;
    public filename: string;

    public get data(): T {
        this.parsedData = this.parsedData || this.readIn(this.fileContents);
        return this.parsedData;
    }
}