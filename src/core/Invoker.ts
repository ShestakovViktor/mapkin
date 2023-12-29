import {Action} from "@core/action";

export class Invoker {


    done: Action[] = [];
    canceled: Action[] = [];

    execute(action: Action): void {
        action.execute();
        this.canceled.length = 0;
    }


    undo(): void {
        const action = this.done.pop();
        if (!action) return;

        action.cancel();
        this.canceled.push(action);
    }


    redo(): void {
        const action = this.canceled.pop();

        if (!action) return;

        action.execute();
        this.done.push(action);
    }
}