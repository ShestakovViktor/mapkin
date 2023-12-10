import {Mode} from "@core/mode";

export class AddMarkerMode extends Mode {
    /**
     * @param {MouseEvent} event
     */
    onMouseDown(event) {
        console.log(event.pageX, event.pageY);
    }
}