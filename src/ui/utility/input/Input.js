/* eslint-disable no-unused-vars */
import {Mode, SelectMode, MarkerMode} from ".";

export class Input {

    /** @param {import("@core").Core} core */
    constructor(core) {
        /** @private */
        this.modes = {
            select: new SelectMode(core),
            marker: new MarkerMode(core)
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