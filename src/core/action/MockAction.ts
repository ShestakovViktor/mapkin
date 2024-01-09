import {Action} from "@core/action";

export class MockAction extends Action {
    constructor(private store: string[]) {
        super();
    }

    execute(): void {
        this.store.push("Mock string");
    }

    cancel(): void {
        this.store.pop();
    }
}