import {SelectMode, MarkerMode} from "@core/mode";

export class Interaction {

    /**
     * @param {import("@src/viewer").Viewer} viewer
     * @param {import("@core").Project} project
     * @param {import("@core").Invoker} invoker
     */
    constructor(viewer, project, invoker) {
        /** @private */
        this.modes = {
            select: new SelectMode(viewer, project, invoker),
            marker: new MarkerMode(viewer, project, invoker)
        };

        /** @private */
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