import {Project, Invoker, Converter} from "@core";
import {Viewer} from "@viewer";
import {WebArchiveDriver, WebImageDriver} from "./driver";
import {Data, Entity, Tile} from "@src/type";

export class Core {
    project: Project;

    public invoker = new Invoker();

    private archiveDriver = new WebArchiveDriver();

    private imageDriver = new WebImageDriver();

    converter: Converter;

    constructor(public viewer: Viewer) {
        this.viewer = viewer;

        this.project = new Project();

        this.converter = new Converter(this.archiveDriver);
    }

    async exportProject(): Promise<Blob> {
        return await this.converter.exportProject(this.project);
    }

    async exportProjectAsSite(): Promise<Blob> {
        return await this.converter.exportSite(this.project);
    }

    async importProject(blob: Blob): Promise<void> {
        this.project = await this.converter.importProject(blob);
        this.viewer.init(this.project.getData(), this.project.getAssets());
        this.viewer.render();
    }

    async initProject(params: {
        projectName: string;
        mapFile: File;
        horizontalTilesNumber: number;
        verticalTilesNumber: number;
    }): Promise<void> {
        const {width, height, tiles} = await this.imageDriver.initImage(
            params.mapFile,
            params.horizontalTilesNumber,
            params.verticalTilesNumber
        );

        const data: Partial<Data> = {
            name: params.projectName,
            size: {width, height},
            grid: {
                rows: params.verticalTilesNumber,
                cols: params.horizontalTilesNumber,
            },
        };

        const project = new Project({data});

        const mapEntity: Entity = {type: "group"};
        const mapId = project.addEntity(mapEntity);
        project.appendChild(mapId);

        tiles.forEach((data) => {
            const tile: Tile = {
                type: "tile",
                x: data.x,
                y: data.y,
                width: data.width,
                height: data.height,
                asset: project.addAsset(data.blob),
            };

            const entityId = project.addEntity(tile);

            project.appendChild(entityId, mapId);
        });

        this.project = project;

        this.viewer.init(this.project.getData(), this.project.getAssets());
        this.viewer.render();
    }
}