import {Action} from "@core/action";
import {Entity} from "@src/type";
import {Project} from "@project";

export class AddEntityAction extends Action {
    private entityId?: string;

    constructor(
        private project: Project,
        private data: Entity,
        private parentId: string
    ) {
        super();
    }

    execute(): void {
        this.entityId = this.project.addEntity(this.data);
        this.project.appendChild(this.entityId, this.parentId);
    }
}