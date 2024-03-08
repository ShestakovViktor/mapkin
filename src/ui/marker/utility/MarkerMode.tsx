import {AddEntityAction} from "@core/action";
import {OVERLAY} from "@src/project";
import {Marker} from "@src/type";

import {Modal} from "@ui/widget";
import {MarkerCreateDialog} from "@src/ui/marker/widget";
import {Core} from "@src/core";
import {Project} from "@project";
import {Mode} from "@ui/editor/utility";

export class MarkerMode implements Mode {
    private click: [number, number] = [0, 0];

    private createMarkerModal: Modal;

    constructor(project: Project, core: Core) {
        const data: {text: string; sourceId: string} = {text: "", sourceId: ""};

        this.createMarkerModal = new Modal("#modal");
        this.createMarkerModal.render(
            <MarkerCreateDialog
                onClose={() => this.createMarkerModal.hide()}
                onSubmit={ (event: SubmitEvent): void => {
                    event.preventDefault();

                    const submitter = event.submitter as HTMLInputElement;

                    if (submitter.name == "reject") {
                    // resolve(undefined);
                    }
                    else {
                        const form = event.target as HTMLFormElement;
                        const formData = new FormData(form);

                        data.text = String(formData.get("markerText"));
                        const assetId = String(formData.get("assetId"));

                        const asset = project.getAsset(assetId);
                        data.sourceId = asset.sourceId;

                        const markerData: Marker = {
                            type: "marker",
                            x: this.click[0],
                            y: this.click[1],
                            sourceId: data.sourceId,
                            text: data.text,
                        };

                        const layerId = project.getEntityId({name: OVERLAY});

                        if (!layerId) throw new Error("There is no ovelay layer");
                        const addEntityAction = new AddEntityAction(
                            project,
                            markerData,
                            layerId
                        );

                        core.invoker.execute(addEntityAction);
                    }
                }}
            />
        );
    }

    onMouseClick(event: MouseEvent): void {
        this.click = [event.pageX, event.pageY];
        this.createMarkerModal.show();
    }
}