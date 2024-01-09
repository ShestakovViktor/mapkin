import {Action} from "@core/action";

export class Invoker {

    private executed: Action[] = [];

    private canceled: Action[] = [];

    execute(action: Action): void {
        action.execute();
        this.executed.push(action);
        this.canceled.length = 0;
    }

    undo(): void {
        const action = this.executed.pop();
        if (!action) return;

        action.cancel();
        this.canceled.push(action);
    }

    redo(): void {
        const action = this.canceled.pop();

        if (!action) return;

        action.execute();
        this.executed.push(action);
    }
}