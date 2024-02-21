import {AddEntityAction} from "@core/action";
import {OVERLAY} from "@src/project";
import {Marker} from "@src/type";

import {createModalWidget} from "@src/ui/modal/utility";
import {CreateMarkerDialog} from "@src/ui/marker/widget";
import {Core} from "@src/core";
import {Project} from "@project";

type Mode = {
    onMouseClick: (event: MouseEvent) => void;
    //onMouseUp: (event: MouseEvent) => void;
};

export function MarkerMode(project: Project, core: Core): Mode  {
    let click: [number, number] = [0, 0];
    const data: {text: string; sourceId: string} = {text: "", sourceId: ""};

    const modal = createModalWidget();
    modal.render(
        <CreateMarkerDialog
            onClose={modal.hide}
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
                        x: click[0],
                        y: click[1],
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

    function onMouseClick(event: MouseEvent): void {
        click = [event.pageX, event.pageY];
        modal.show();
    }

    return {
        onMouseClick,
    };
}