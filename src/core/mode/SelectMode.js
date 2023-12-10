import {Mode} from "@core/mode";

export class SelectMode extends Mode {
    /**
     * @param {MouseEvent} event
     */
    onMouseDown(event) {
        console.log(event.pageX, event.pageY);
    }
}