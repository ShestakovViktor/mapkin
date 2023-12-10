import {Mode, AddMarkerMode} from "@core/mode";
import {Project} from "@core";

export class Core {
    /**
     * @param {import("@engine").Engine} engine
     */
    constructor(engine) {
        this.engine = engine;

        this.project = new Project();

        this.mode = new Mode();

        this.modes = {
            addMarker: new AddMarkerMode()
        };
    }


    /**
     * @param {string} name
     */
    setMode(name) {
        console.log(name);
        //this.mode = this.modes[name];
    }

    /**
     * @param {import("@core").Params} params
     */
    async initProject(params) {
        await this.project.init(params);
        if (this.project.data) this.engine.init(this.project.data);
    }
}