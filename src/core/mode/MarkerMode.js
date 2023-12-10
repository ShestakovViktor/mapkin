import {Mode} from "@core/mode";

export class MarkerMode extends Mode {
    /**
     * @param {MouseEvent} event
     */
    onMouseDown(event) {
        console.log(event.pageX, event.pageY);
    }
}