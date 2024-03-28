import {Action} from "@core/action";
import {Entity} from "@src/type";
import {Store} from "@store";

export class AddEntityAction extends Action {
    private entityId?: string;

    constructor(
        private store: Store,
        private data: Entity,
        private parentId: string
    ) {
        super();
    }

    execute(): void {
        this.entityId = this.store.entity.add(this.data);
        this.store.entity.appendChild(this.entityId, this.parentId);
    }
}