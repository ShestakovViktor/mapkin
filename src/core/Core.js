import {IO, Project} from "@core";


export class Core {
    /**
     * @param {import("@engine").Engine} engine
     */
    constructor(engine) {
        /** @private */
        this.engine = engine;

        /** @private */
        this.project = new Project();

        this.io = new IO();
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
    async newProject(params) {
        await this.project.init(params);
        if (this.project.data) {
            this.engine.init(this.project.data);
        }
    }

    async testProject() {
        const response = await fetch("/testMap.jpg");

        const mapFile = await response.blob();

        const params = {
            projectName: "Test project",
            horizontalTilesNumber: 5,
            verticalTilesNumber: 5,
            mapFile,
        };

        await this.project.init(params);
        if (this.project.data) {
            this.engine.init(this.project.data);
        }
    }
}