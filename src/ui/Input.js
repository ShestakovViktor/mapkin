/* eslint-disable no-unused-vars */
import {Mode, SelectMode, MarkerMode} from "./mode";

export class Input {

    /**
     * @param {import("@core").Core} core
     * @param {import("@ui").Modal} modal
     */
    constructor(core, modal) {
        /** @private */
        this.modes = {
            select: new SelectMode(core, modal),
            marker: new MarkerMode(core, modal)
        };

        /**
         * @private
         * @type {Mode}
         */
        this.mode = this.modes["select"];
    }


    /**
     * @param {keyof typeof this.modes} name
     */
    setMode(name) {
        console.log(`Mode set: ${name}`);
        this.mode = this.modes[name];
    }


    /**
     * @param {MouseEvent} event
     */
    onMouseClick(event) {
        this.mode.onMouseClick(event);
    }


    /**
     * @param {MouseEvent} event
     */
    onMouseUp(event) {
        this.mode.onMouseUp(event);
    }
}