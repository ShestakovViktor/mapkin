import {IO, Project} from "@core";

export class Core {
    /**
     * @param {import("@engine").Engine} engine
     */
    constructor(engine) {
        /** @private */
        this.engine = engine;

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
        this.engine.render(this.project);
    }

    /**
     * @param {File} file
     * @return {Promise<void>}
     */
    async importProject(file) {
        await this.project.converter.import(file);
        this.engine.render(this.project);
    }

    /**
     * @return {Promise<File>}
     */
    async exportProject() {
        return await this.project.converter.export();
    }

    /**
     * @return {Promise<File>}
     */
    async exportProjectAsSite() {
        return await this.project.converter.exportAsSite();
    }
}