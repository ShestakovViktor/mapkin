export class Invoker {

    constructor() {
        /** @type {import("@core/action").Action[]} */
        this.done = [];

        /** @type {import("@core/action").Action[]} */
        this.canceled = [];
    }

    /** @param {import("@core/action").Action} action */
	execute(action) {
		action.execute();
		this.canceled.length = 0;
	}


	undo() {
		const action = this.done.pop();
		if (!action) return;

		action.cancel();
		this.canceled.push(action);
	}


	redo() {
		const action = this.canceled.pop();

		if (!action) return;

		action.execute();
		this.done.push(action);
	}
}