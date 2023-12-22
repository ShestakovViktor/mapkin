import {Project, Invoker} from "@core";

export class Core {
    /** @param {import("@src/viewer").Viewer} viewer */
    constructor(viewer) {
        this.viewer = viewer;

        this.project = new Project();

        this.invoker = new Invoker();
    }

    /**
     * @param {{
    *     projectName: string;
    *     mapFile: File;
    *     horizontalTilesNumber: number;
    *     verticalTilesNumber: number;
    * }} params
    */
    async initProject(params) {
        await this.project.init(params);
        this.viewer.init(this.project.data, this.project.assets);
        this.viewer.render();
    }

    /** @param {File} file */
    async importProject(file) {
        await this.project.converter.import(file);
        console.log(this.project);
        this.viewer.init(this.project.data, this.project.assets);
        this.viewer.render();
    }

    /** @return {Promise<File>} */
    async exportProject() {
        return await this.project.converter.export();
    }

    /** @return {Promise<File>} */
    async exportProjectAsSite() {
        return await this.project.converter.exportAsSite();
    }
}