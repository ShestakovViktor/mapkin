import {Data, Node, Entity, Asset, Group, Tile} from "@src/type";
import {WebArchiveDriver, WebImageDriver} from "./driver";
import {Converter} from "./Converter";

export const MAP = "map";
export const OVERLAY = "overlay";

export class Project {
    private data: Data;

    private archiveDriver = new WebArchiveDriver();

    private imageDriver = new WebImageDriver();

    private converter: Converter;

    private onRenderListeners: (() => void)[] = [];

    constructor(params?: Partial<Data>) {
        this.converter = new Converter(this.archiveDriver);

        this.data = this.initData(params);
    }

    init(data: Data): void {
        this.data = data;
    }

    getRoot(): Node {
        if (!this.data.layout) throw new Error();
        return this.data.layout;
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
            entity: {
                [rootId]: {type: "group", name: "root"},
                [mapId]: {type: "group", name: "map"},
                [overlayId]: {type: "group", name: OVERLAY},
            },
            asset: {},
            layout: {id: rootId, childs:[{id: mapId}, {id: overlayId}]},
        };

        return Object.assign(data, params);
    }

    getData(): Data {
        return this.data;
    }

    setData(data: Data): void {
        this.data = data;
    }

    onRender(f: () => void): void {
        this.onRenderListeners.push(f);
    }

    render(): void {
        this.onRenderListeners.forEach((func) => func());
    }

    private getNode(id: string, node: Node): Node | undefined {
        if (node.id == id) return node;
        else if (node.childs) {
            return node.childs.find((child) => {
                return this.getNode(id, child);
            });
        }
        return;
    }

    appendChild(entityId: string, parentId?: string): void {
        if (!parentId) {
            this.data.layout = {id: entityId};
            return;
        }

        if (!this.data.layout) throw new Error();

        const parent = this.getNode(parentId, this.data.layout);

        if (!parent) throw new Error("Parent node does not exist");
        if (!parent.childs) parent.childs = [];

        parent.childs.push({id: entityId});
    }

    addEntity(data: Entity): string {
        const id = this.genId();
        this.data.entity[id] = {...data};
        return id;
    }

    getEntity(id: string): Entity | undefined {
        return this.data.entity[id];
    }

    getEntityId(params: {[key: string]: any}): string | undefined {
        for (const entityId in this.data.entity) {
            const entity = this.data.entity[entityId];

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
        const entityId = this.getEntityId({sourceId: id});
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

    async initAsset({name, file}: {
        name: string;
        file: File;
    }): Promise<string> {
        const base64 = await this.imageDriver.fooImage(file);
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
        // const {width, height, tiles} = await this.imageDriver.initImage(
        //     params.mapFile,
        //     params.horizontalTilesNumber,
        //     params.verticalTilesNumber
        // );

        // const data: Partial<Data> = {
        //     name: params.projectName,
        //     size: {width, height},
        //     grid: {
        //         rows: params.verticalTilesNumber,
        //         cols: params.horizontalTilesNumber,
        //     },
        // };

        // const project = new Project(data);

        // const mapId = project.getEntityId({name: "map"});
        // if (!mapId) throw new Error("No map");

        // const promises = tiles.map((data) => {
        //     const sourceId = project.addSource(data.base64);
        //     const tile: Tile = {
        //         type: "tile",
        //         x: data.x,
        //         y: data.y,
        //         width: data.width,
        //         height: data.height,
        //         sourceId,
        //     };

        //     const entityId = project.addEntity(tile);

        //     project.appendChild(entityId, mapId);
        // });

        // await Promise.all(promises);

        // this.project = project;
    }
}