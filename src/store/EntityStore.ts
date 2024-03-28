import {generateId} from "@src/util";
import {Entity, Group, Id} from "@type";

export class EntityStore {
    constructor(private entity: {[key: Id]: Entity}) {}

    add(data: Entity): Id {
        const id = generateId();
        this.entity[id] = {...data};
        return id;
    }

    getById(id: Id): Entity | undefined {
        return this.entity[id];
    }

    getByParams(params: {[key: Id]: any}): Id | undefined {
        for (const entityId in this.entity) {
            const entity = this.entity[entityId];

            for (const prop in params) {
                if (!(prop in entity)) break;
                if (params[prop] == (entity as any)[prop]) {
                    return entityId;
                }
            }
        }
        return undefined;
    }

    appendChild(entityId: Id, parentId: Id): void {
        const parent = this.entity[parentId] as Group;
        parent.childs.push(entityId);
    }
}