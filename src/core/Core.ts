import {Invoker, Converter} from "@core";
import {ArchiveDriver, ImageDriver} from "@src/interface";
import {WebArchiveDriver, WebImageDriver} from "./driver";
import {Store} from "@store";
import {Tile} from "@type";

export class Core {
    public invoker = new Invoker();

    private archiveDriver: ArchiveDriver;

    private imageDriver: ImageDriver;

    public converter: Converter;

    constructor(private store: Store) {
        this.imageDriver = new WebImageDriver();
        this.archiveDriver = new WebArchiveDriver();

        this.converter = new Converter(this.store, this.archiveDriver);
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

        this.store.setData({
            name: params.projectName,
            size: {width, height},
            grid: {
                rows: params.verticalTilesNumber,
                cols: params.horizontalTilesNumber,
            },
        });

        const mapId = this.store.entity.getByParams({name: "map"});
        if (!mapId) throw new Error("No map");

        const promises = tiles.map((data) => {
            const sourceId = this.store.source.add(data.base64);
            const tile: Tile = {
                type: "tile",
                x: data.x,
                y: data.y,
                width: data.width,
                height: data.height,
                sourceId,
            };

            const entityId = this.store.entity.add(tile);

            this.store.entity.appendChild(entityId, mapId);
        });

        await Promise.all(promises);
    }

    async initAsset({name, file, width, height}: {
        name: string;
        width: number;
        height: number;
        file: File;
    }): Promise<string> {
        const base64 = await this.imageDriver.fooImage(file, width, height);
        const source = this.store.source.add(base64);
        const asset = this.store.asset.add({name, sourceId: source});
        return asset;
    }
}