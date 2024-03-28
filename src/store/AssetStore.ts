import {generateId} from "@src/util";
import {Asset, Id} from "@type";

export class AssetStore {
    constructor(private asset: {[key: Id]: Asset}) {}

    add(data: Asset): Id {
        const id = generateId();
        this.asset[id] = {...data};
        return id;
    }

    get(id: Id): Asset {
        return this.asset[id];
    }

    getAll(): {[key: Id]: Asset} {
        return this.asset;
    }

    // delAsset(id: string): void {
    //     const entityId = this.getEntityByParams({sourceId: id});
    //     if (entityId) throw new Error("Can't delete asset");

    //     delete this.data.asset[id];
    // }

    getByParams(params: {[key: Id]: any}): Id | undefined {
        for (const assetId in this.asset) {
            const asset = this.asset[assetId];

            for (const prop in params) {
                if (!(prop in asset)) break;
                if (params[prop] == (asset as any)[prop]) {
                    return assetId;
                }
            }
        }
        return undefined;
    }
}