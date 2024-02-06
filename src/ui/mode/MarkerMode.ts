import {Mode} from ".";
import {AddEntityAction} from "@core/action";
import {OVERLAY} from "@src/core/Project";
import {Marker} from "@src/type";

import {CreateMarkerDialog} from "@ui/feature/marker/component";

export class MarkerMode extends Mode {

    async onMouseClick(event: MouseEvent): Promise<void> {

        const res: {text: string} | undefined = await new Promise((resolve) => {
            const dialog = CreateMarkerDialog({
                onSubmit: (event) => {
                    event.preventDefault();

                    const submitter = event.submitter as HTMLInputElement;

                    if (submitter.name == "reject") {
                        resolve(undefined);
                    }
                    else {
                        const form = event.target as HTMLFormElement;
                        const formData = new FormData(form);

                        const text = String(formData.get("markerText"));

                        resolve({text});
                    }
                },
            });

            this.modal.show(dialog);
        });
        this.modal.hide();

        if (res) {
            const [x, y] = this.viewer
                .getRelativeCoordinates([event.pageX, event.pageY]);

            const markerData: Marker = {
                type: "marker", x, y, source: "marker", text: res.text,
            };

            const layerId = this.core.project.getEntityId({name: OVERLAY});

            if (!layerId) throw new Error("There is no ovelay layer");

            const addEntityAction = new AddEntityAction(
                this.core,
                markerData,
                layerId
            );

            this.core.invoker.execute(addEntityAction);
        }
    }
}