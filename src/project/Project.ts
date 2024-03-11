import {Data, Entity, Asset, Group, Tile} from "@src/type";
import {WebArchiveDriver, WebImageDriver} from "./driver";
import {Converter} from "./Converter";

export const MAP = "map";
export const OVERLAY = "overlay";

export class Project {
    private data: Data;

    private archiveDriver = new WebArchiveDriver();

    private imageDriver = new WebImageDriver();

    private converter: Converter;

    constructor(params?: Partial<Data>) {
        this.converter = new Converter(this.archiveDriver);

        this.data = this.initData(params);
    }

    init(data: Data): void {
        this.data = data;
    }

    getRootId(): string {
        const rootId = this.getEntityByParams({name: "root"});
        if (!rootId) throw Error("There is no entity with such id");
        return rootId;
    }

    getRootNode(): Entity {
        const rootId = this.getRootId();
        const rootNode = this.data.layout[rootId];
        return rootNode;
    }

    initData(params?: Partial<Data>): Data {
        const rootId = this.genId();
        const mapId = this.genId();
        const overlayId = this.genId();

        const data = {
            name: "New project",
            size: {width: 0, height: 0},
            grid: {rows: 0, cols: 0},
            source: {},
            layout: {
                [rootId]: {type: "group", name: "root", childs: [mapId, overlayId]},
                [mapId]: {type: "group", name: MAP, childs: []},
                [overlayId]: {type: "group", name: OVERLAY, childs: []},
            },
            asset: {},
        };

        return Object.assign(data, params);
    }

    getData(): Data {
        return this.data;
    }

    setData(data: Data): void {
        this.data = data;
    }

    appendChild(entityId: string, parentId: string): void {
        const parent = this.data.layout[parentId] as Group;
        parent.childs.push(entityId);
    }

    addEntity(data: Entity): string {
        const id = this.genId();
        this.data.layout[id] = {...data};
        return id;
    }

    getEntityById(id: string): Entity | undefined {
        return this.data.layout[id];
    }

    getEntityByParams(params: {[key: string]: any}): string | undefined {
        for (const entityId in this.data.layout) {
            const entity = this.data.layout[entityId];

            for (const prop in params) {
                if (!(prop in entity)) break;
                if (params[prop] == (entity as any)[prop]) {
                    return entityId;
                }
            }
        }
        return undefined;
    }

    addAsset(data: Asset): string {
        const id = this.genId();
        this.data.asset[id] = {...data};
        return id;
    }

    getAsset(id: string): Asset {
        return this.data.asset[id];
    }

    getAssets(): {[key: string]: Asset} {
        return this.data.asset;
    }

    delAsset(id: string): void {
        const entityId = this.getEntityByParams({sourceId: id});
        if (entityId) throw new Error("Can't delete asset");

        delete this.data.asset[id];
    }

    getAssetId(params: {[key: string]: any}): string | undefined {
        for (const assetId in this.data.asset) {
            const asset = this.data.asset[assetId];

            for (const prop in params) {
                if (!(prop in asset)) break;
                if (params[prop] == (asset as any)[prop]) {
                    return assetId;
                }
            }
        }
        return undefined;
    }

    addSource(base64: string): string {
        const id = this.genId();
        this.data.source[id] = base64;
        return id;
    }

    getSource(id: string): string {
        return this.data.source[id];
    }

    getSources(): {[key: string]: string} {
        return this.data.source;
    }

    private genId(): string {
        return Date.now().toString(36)
            + Math.random().toString(36).substring(2, 12).padStart(12, "0");
    }

    async export(): Promise<Blob> {
        return await this.converter.exportProject(this);
    }

    async exportProjectAsSite(): Promise<Blob> {
        return await this.converter.exportSite(this);
    }

    async import(blob: Blob): Promise<void> {
        this.data = await this.converter.importProject(blob);
    }

    async initAsset({name, file, width, height}: {
        name: string;
        width: number;
        height: number;
        file: File;
    }): Promise<string> {
        const base64 = await this.imageDriver.fooImage(file, width, height);
        const source = this.addSource(base64);
        const asset = this.addAsset({name, sourceId: source});
        return asset;
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

        this.data = this.initData({
            name: params.projectName,
            size: {width, height},
            grid: {
                rows: params.verticalTilesNumber,
                cols: params.horizontalTilesNumber,
            },
        });

        const mapId = this.getEntityByParams({name: "map"});
        if (!mapId) throw new Error("No map");

        const promises = tiles.map((data) => {
            const sourceId = this.addSource(data.base64);
            const tile: Tile = {
                type: "tile",
                x: data.x,
                y: data.y,
                width: data.width,
                height: data.height,
                sourceId,
            };

            const entityId = this.addEntity(tile);

            this.appendChild(entityId, mapId);
        });

        await Promise.all(promises);
    }
}