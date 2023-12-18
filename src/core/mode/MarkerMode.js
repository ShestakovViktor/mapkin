import {AddMarkerAction} from "@core/action";
import {Mode} from "@core/mode";

export class MarkerMode extends Mode {
    /** @param {MouseEvent} event */
    onMouseClick(event) {

        console.log(event);

        const map = /** @type {HTMLDivElement | null} */(
            document.querySelector("#map")
        );

        if (map) {
            const rect = map.getBoundingClientRect();

            this.invoker.execute(
                new AddMarkerAction(
                    this.viewer,
                    this.project,
                    {
                        x: Math.abs(rect.x) + event.pageX,
                        y: Math.abs(rect.y) + event.pageY,
                        asset: "marker",
                        text: "Hello world",
                    }
                )
            );
        }

    }
}