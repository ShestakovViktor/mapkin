/* eslint-disable no-unused-vars */
export class Mode {

    /** @param {import("@core").Core} core */
    constructor(core) {
        this.core = core;
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