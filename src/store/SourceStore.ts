import {generateId} from "@src/util";
import {Id} from "@type";

export class SourceStore {
    constructor(private source: {[key: Id]: string}) {}

    add(base64: string): Id {
        const id = generateId();
        this.source[id] = base64;
        return id;
    }

    get(id: Id): string {
        return this.source[id];
    }

    getAll(): {[key: Id]: string} {
        return this.source;
    }
}