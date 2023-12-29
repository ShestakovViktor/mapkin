import {Mode} from ".";
import {AddMarkerAction} from "@core/action";

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
            const map = this.core.viewer.map;

            const rect = map.getBoundingClientRect();

            console.log(this.core.viewer.factor);

            const markerData = {
                x: (Math.abs(rect.x) + event.pageX) / this.core.viewer.factor,
                y: (Math.abs(rect.y) + event.pageY) / this.core.viewer.factor,
                asset: "marker",
                text: res.text,
            };

            const addMarkerAction = new AddMarkerAction(this.core, markerData);

            this.core.invoker.execute(addMarkerAction);
        }
    }
}