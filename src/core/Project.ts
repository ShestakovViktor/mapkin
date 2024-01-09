import {Data, Node, Entity} from "@src/type";

export const MAP = "map";
export const OVERLAY = "overlay";

export class Project {
    private data: Data;

    private assets: {[key: string]: Blob};

    constructor(params?: Partial<{
        data: Partial<Data>;
        assets: {[key: string]: Blob};
    }>) {

        const rootId = this.genId();
        const rootEntity: Entity = {
            type: "group",
        };

        const data: Data = {
            name: "New project",
            size: {width: 0, height: 0},
            grid: {rows: 0, cols: 0},
            entity: {[rootId]: rootEntity},
            layout: {id: rootId, childs: []},
        };

        if (params?.data) Object.assign(data, params.data);

        this.data = data;
        this.assets = params?.assets ?? {};
    }

    getData(): Data {
        return this.data;
    }

    setData(data: Data): void {
        this.data = data;
    }

    private getRootNode(): Node {
        return this.data.layout;
    }

    private getNode(id: string, node?: Node): Node | undefined {
        if (!node) node = this.getRootNode();

        if (node.id == id) return node;
        else if (node.childs) {
            return node.childs.find((child) => {
                return this.getNode(id, child);
            });
        }
        return;
    }

    appendChild(entityId: string, parentId?: string): void {
        const parent = parentId
            ? this.getNode(parentId)
            : this.getRootNode();

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

    getEntityId(params: Partial<Entity>): string | undefined {
        for (const key in this.data.entity) {
            const entity = this.data.entity[key];
            if (params.name && entity.name == params.name) {
                return key;
            }
        }
        return undefined;
    }

    addAsset(blob: Blob): string {
        const id = this.genId();
        this.assets[id] = blob;
        return id;
    }

    getAssets(): {[key: string]: Blob} {
        return this.assets;
    }

    private genId(): string {
        return Date.now().toString(36)
            + Math.random().toString(36).substring(2, 12).padStart(12, "0");
    }
}