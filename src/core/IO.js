import {SelectMode, MarkerMode} from "@core/mode";

export class IO {
    constructor() {
        /** @private */
        this.modes = {
            select: new SelectMode(),
            marker: new MarkerMode()
        };

        /** @private */
        this.mode = this.modes["select"];
    }


    /**
     * @param {keyof typeof this.modes} name
     */
    setMode(name) {
        this.mode = this.modes[name];
    }


    /**
     * @param {MouseEvent} event
     */
    onMouseDown(event) {
        this.mode.onMouseDown(event);
    }


    /**
     * @param {MouseEvent} event
     */
    onMouseUp(event) {
        this.mode.onMouseUp(event);
    }
}