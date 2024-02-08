import styles from "./CreateMarkerDialog.module.scss";
import {Dialog, Label, Form, TextArea, Input, Field, Column, Row} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {AssetSelectDialog} from "@ui/feature/asset/component";
import {useContext} from "@src/ui/context";

i18next.addResourceBundle("en", "marker", {CreateMarkerDialog: en}, true, true);

type Props = {
    onSubmit: (event: SubmitEvent) => void;
};

export function CreateMarkerDialog(props: Props): HTMLDivElement {
    const context = useContext();

    const assetInput = Input({
        type: "text",
        name: "assetId",
    });

    const assetButton = Input({
        type: "button",
        value: i18next.t(
            "marker:CreateMarkerDialog.chooseAsset",
            {postProcess: ["capitalize"]}
        ),
        onClick: () => {
            function onAssetSelect(asset: string): void {
                assetInput.value = asset;
            }

            context.modal.show(AssetSelectDialog({onSelect: onAssetSelect}));
        },
    });

    return Dialog({
        class: styles.CreateMarkerDialog,
        children: [
            Form({
                onSubmit: props.onSubmit,
                class: styles.MarkerForm,
                children: [
                    Column({
                        children: [
                            Label({
                                htmlFor: "markerText",
                                innerText: i18next.t(
                                    "marker:CreateMarkerDialog.text",
                                    {postProcess: ["capitalize"]}
                                ) + ":",
                            }),
                            TextArea({
                                id: "markerText",
                                name: "markerText",
                            }),
                        ],
                    }),

                    Row({children: [assetButton, assetInput]}),

                    Input({
                        type: "submit",
                        value: i18next.t(
                            "marker:CreateMarkerDialog.createMarker",
                            {postProcess: ["capitalize"]}
                        ),
                    }),
                ],
            }),
        ],
    });
}