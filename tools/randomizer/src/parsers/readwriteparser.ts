import { diffChars, diffLines } from "diff";
import { writeFileSync } from "fs";
import ReadOnlyParser from "./readonlyparser";

export default abstract class ReadWriteParser<T> extends ReadOnlyParser<T> {

    protected abstract toFile(data: T): string[];

    protected writeOut() {
        writeFileSync(this.filename, this.toFile(this.parsedData).join('\n'));
    }

    public get data(): T {
        return super.data;
    }
    public set data(data: T) {
        this.parsedData = data;
        this.writeOut();
    }

    public test() {
        const input = this.fileContents;
        const data = this.readIn(input);
        this.parsedData = data;
        const output = this.toFile(data);
        const diff = diffLines(input.join('\n'), output.join('\n'));

        if (diff.some(d=>d.added || d.removed)) {
            console.error(diff);
            throw new Error(`Failed to match input/output for ${this.filename}`);
        }
    }
}