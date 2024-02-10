import styles from "./AssetCreateDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {Dialog, Form, Input, Label, Row} from "@ui/widget";
import {useContext} from "@ui/context";

i18next.addResourceBundle(
    "en", "asset", {AssetCreateDialog: en}, true, true
);

type Props = {
    onSubmit?: (assetId: string) => void;
};

export function AssetCreateDialog(props?: Props): HTMLDivElement {
    const context = useContext();

    async function handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = String(formData.get("assetName")) || "Asset";

        const file = formData.get("assetFile") as File;

        const assetId = await context.core.initAsset({name, file});

        if (props?.onSubmit) props.onSubmit(assetId);
    }

    return Dialog({
        class: styles.AssetCreateDialog,
        title: i18next.t(
            "asset:AssetCreateDialog.dialogTitle",
            {postProcess: ["capitalize"]}
        ),
        children: [
            Form({
                onSubmit: (event) => {void handleSubmit(event);},
                class: styles.ResourceForm,
                children: [
                    Row({
                        children: [
                            Label({
                                htmlFor: "assetName",
                                innerText: i18next.t(
                                    "asset:AssetCreateDialog.name",
                                    {postProcess: ["capitalize"]}
                                ),
                            }),
                            Input({
                                type: "text",
                                id: "assetName",
                                name: "assetName",
                            }),
                        ],
                    }),
                    Row({
                        children: [
                            Label({
                                htmlFor: "assetFile",
                                innerText: i18next.t(
                                    "asset:AssetCreateDialog.file",
                                    {postProcess: ["capitalize"]}
                                ),
                            }),
                            Input({
                                type: "file",
                                name: "assetFile",
                                accept: "image/*",
                            }),
                        ],
                    }),

                    Input({type: "submit"}),
                ],
            }),
        ],
    });
}