/* eslint-disable no-unused-vars */
export class Mode {

    /**
     * @param {import("@core").Core} core
     * @param {import("@ui").Modal} modal
     */
    constructor(core, modal) {
        this.core = core;
        this.modal = modal;
    }


    /** @param {MouseEvent} event */
    onMouseClick(event) {
        throw new Error("Method must be implemented");
    }


    /** @param {MouseEvent} event */
    onMouseUp(event) {
        throw new Error("Method must be implemented");
    }
}