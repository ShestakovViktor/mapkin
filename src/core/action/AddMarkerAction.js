import {Action} from "@core/action";

export class AddMarkerAction extends Action {

    /**
     * @param {import("@src/viewer").Viewer} viewer
     * @param {import("@core").Project} project
     * @param {import("@type").Marker} data
     */
    constructor(viewer, project, data) {
        super();
        this.viewer = viewer;
        this.project = project;
        this.data = data;
    }

    execute() {
        this.project.addMarker(this.data);
        this.viewer.render();
    }
}