import {Action} from "@core/action";
import {Core} from "@core";
import {Marker} from "@src/type";

export class AddMarkerAction extends Action {

    constructor(private core: Core, private data: Marker) {
        super();
    }

    execute(): void {
        this.core.project.addMarker(this.data);
        this.core.viewer.render();
    }
}