import styles from "./AssetCreateDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {Dialog, Form, Input, Label} from "@ui/widget";
import {useContext} from "@ui/context";

i18next.addResourceBundle(
    "en", "asset", {AssetCreateDialog: en}, true, true
);

export function AssetCreateDialog(): HTMLDivElement {
    const context = useContext();

    async function handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = String(formData.get("assetName")) || "Asset";

        const file = formData.get("assetFile") as File;

        await context.core.initAsset({name, file});

        form.parentElement?.remove();
    }

    return Dialog({
        class: styles.CreateProjectDialog,
        children: [
            Form({
                onSubmit: (event) => {void handleSubmit(event);},
                class: styles.ResourceForm,
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
                        value: "New project",
                        name: "assetName",
                    }),

                    Input({
                        type: "file",
                        name: "assetFile",
                        accept: "image/*",
                    }),

                    Input({type: "submit"}),
                ],
            }),
        ],
    });
}