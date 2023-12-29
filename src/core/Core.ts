import {Project, Invoker} from "@core";
import {Viewer} from "@viewer";

export class Core {
    project: Project;
    invoker: Invoker;


    constructor(public viewer: Viewer) {
        this.viewer = viewer;

        this.project = new Project();

        this.invoker = new Invoker();
    }


    async initProject(params: {
        projectName: string;
        mapFile: File;
        horizontalTilesNumber: number;
        verticalTilesNumber: number;
    }): Promise<void> {
        await this.project.init(params);
        this.viewer.init(this.project.data, this.project.assets);
        this.viewer.render();
    }

    async importProject(file: File): Promise<void> {
        await this.project.converter.import(file);
        console.log(this.project);
        this.viewer.init(this.project.data, this.project.assets);
        this.viewer.render();
    }

    async exportProject(): Promise<File> {
        return await this.project.converter.export();
    }

    async exportProjectAsSite(): Promise<File> {
        return await this.project.converter.exportAsSite();
    }
}