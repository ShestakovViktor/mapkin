import {Data, Node, Entity} from "@src/type";

export const MAP = "map";
export const OVERLAY = "overlay";

export class Project {
    private data: Data;

    constructor(params?: Partial<Data>) {

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
            assets: {},
        };

        Object.assign(data, params);

        this.data = data;
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

    addAsset(base64: string): string {
        const id = this.genId();
        this.data.assets[id] = base64;
        return id;
    }

    getAssets(): {[key: string]: string} {
        return this.data.assets;
    }

    private genId(): string {
        return Date.now().toString(36)
            + Math.random().toString(36).substring(2, 12).padStart(12, "0");
    }
}