import {Data} from "@type";
import {
    AssetStore,
    EntityStore,
    MotionStore,
    SourceStore,
} from "@store";
import {generateId} from "@src/util";

export const ROOT = "root";
export const MAP = "map";
export const OVERLAY = "overlay";

export class Store {
    private data: Data;

    public source: SourceStore;

    public asset: AssetStore;

    public motion: MotionStore;

    public entity: EntityStore;

    constructor(data?: Partial<Data>) {
        this.data = this.initData(data);

        this.source = new SourceStore(this.data.source);
        this.asset = new AssetStore(this.data.asset);
        this.motion = new MotionStore(this.data.motion);
        this.entity = new EntityStore(this.data.entity);
    }

    initData(params?: Partial<Data>): Data {
        const rootId = generateId();
        const mapId = generateId();
        const overlayId = generateId();

        const root = {
            type: "group",
            name: ROOT,
            childs: [mapId, overlayId],
        };

        const map = {
            type: "group",
            name: MAP,
            childs: [],
        };

        const overlay = {
            type: "group",
            name: OVERLAY,
            childs: [],
        };

        const data: Data = {
            name: "New project",
            size: {width: 0, height: 0},
            grid: {rows: 0, cols: 0},
            source: {},
            entity: {[rootId]: root, [mapId]: map, [overlayId]: overlay},
            asset: {},
            motion: {},
        };

        return Object.assign(data, params);
    }

    getData(): Data {
        return this.data;
    }

    setData(data?: Partial<Data>): void {
        this.data = this.initData(data);
        this.source = new SourceStore(this.data.source);
        this.asset = new AssetStore(this.data.asset);
        this.motion = new MotionStore(this.data.motion);
        this.entity = new EntityStore(this.data.entity);
    }
}