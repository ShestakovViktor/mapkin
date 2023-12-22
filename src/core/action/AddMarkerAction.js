import {Action} from "@core/action";

export class AddMarkerAction extends Action {

    /**
     * @param {import("@core").Core} core
     * @param {import("@type").Marker} data
     */
    constructor(core, data) {
        super();
        this.core = core;
        this.data = data;
    }

    execute() {
        this.core.project.addMarker(this.data);
        this.core.viewer.render();
    }
}