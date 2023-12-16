/* eslint-disable no-unused-vars */

export class Mode {

    /**
     * @param {import("@src/viewer").viewer} viewer
     * @param {import("@core").Project} project
     * @param {import("@core").Invoker} invoker
     */
    constructor(viewer, project, invoker) {
        this.viewer = viewer;
        this.project = project;
        this.invoker = invoker;
    }

    /**
     * @abstract
     * @param {MouseEvent} event
     */
    onMouseDown(event) {
        throw new Error("Methor must be implemented");
    }

    /**
     * @abstract
     * @param {MouseEvent} event
     */
    onMouseUp(event) {
        throw new Error();
    }
}