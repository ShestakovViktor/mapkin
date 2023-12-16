import {AddMarkerAction} from "@core/action";
import {Mode} from "@core/mode";

export class MarkerMode extends Mode {
    /** @param {MouseEvent} event */
    onMouseDown(event) {
        this.invoker.execute(
            new AddMarkerAction(
                this.viewer,
                this.project,
                {
                    x: event.pageX,
                    y: event.pageY,
                    asset: "marker",
                    text: "Hello world",
                }
            )
        );

        console.log(this.project.data.layout.markers);
    }
}