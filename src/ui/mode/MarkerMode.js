import {Mode} from ".";
// import {AddMarkerAction} from "@core/action";
import {CreateMarkerDialog} from "@ui/feature/marker/component";

export class MarkerMode extends Mode {

    /** @param {MouseEvent} event */
    onMouseClick(event) {

        this.modal.render(CreateMarkerDialog());


        // const map = this.core.viewer.map;
        // if (!map) return;

        // const rect = map.getBoundingClientRect();

        // const markerData = {
        //     x: Math.abs(rect.x) + event.pageX,
        //     y: Math.abs(rect.y) + event.pageY,
        //     asset: "marker",
        //     text: "Hello world",
        // };

        // const addMarkerAction = new AddMarkerAction(this.core, markerData);

        // this.core.invoker.execute(addMarkerAction);
    }
}