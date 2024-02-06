import {Action} from "@core/action";
import {Core} from "@core";
import {Entity} from "@src/type";

export class AddEntityAction extends Action {
    private entityId?: string;

    constructor(
        private core: Core,
        private data: Entity,
        private parentId: string
    ) {
        super();
    }

    execute(): void {
        this.entityId = this.core.project.addEntity(this.data);
        this.core.project.appendChild(this.entityId, this.parentId);
        this.core.viewer.render();
    }
}