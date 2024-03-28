import {generateId} from "@src/util";
import {Id, Motion} from "@type";

export class MotionStore {
    constructor(private motion: {[key: Id]: Motion}) {}

    add(data: Motion): string {
        const id = generateId();
        this.motion[id] = {...data};
        return id;
    }

    get(id: Id): Motion {
        return this.motion[id];
    }

    getAll(): {[key: Id]: Motion} {
        return this.motion;
    }

    // delAsset(id: string): void {
    //     const entityId = this.getEntityByParams({sourceId: id});
    //     if (entityId) throw new Error("Can't delete asset");

    //     delete this.data.asset[id];
    // }

    getByParams(params: {[key: Id]: any}): Id | undefined {
        for (const motionId in this.motion) {
            const asset = this.motion[motionId];

            for (const prop in params) {
                if (!(prop in asset)) break;
                if (params[prop] == (asset as any)[prop]) {
                    return motionId;
                }
            }
        }
        return undefined;
    }
}