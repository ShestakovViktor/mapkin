import {Data, Node, Entity, Asset, Group} from "@src/type";

export const MAP = "map";
export const OVERLAY = "overlay";

export class Project {
    private data: Data;

    constructor(params?: Partial<Data>) {
        this.data = {
            name: "New project",
            size: {width: 0, height: 0},
            grid: {rows: 0, cols: 0},
            source: {},
            entity: {},
            asset: {},
            layout: undefined,
        };

        const rootId = this.addEntity({type: "group", name: "root"} as Group);
        this.appendChild(rootId);

        const mapId = this.addEntity({type: "group", name: "map"} as Group);
        this.appendChild(mapId, rootId);

        const overlayId = this.addEntity({type: "group", name: OVERLAY} as Group);
        this.appendChild(overlayId, rootId);

        this.data = Object.assign(this.data, params);
    }

    getData(): Data {
        return this.data;
    }

    setData(data: Data): void {
        this.data = data;
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
}