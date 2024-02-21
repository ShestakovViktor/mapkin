import styles from "./AssetCreateDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {Dialog, Form, Row} from "@ui/widget";
import {useEditorContext} from "@src/ui/context";
import {JSXElement} from "solid-js";

i18next.addResourceBundle(
    "en", "asset", {AssetCreateDialog: en}, true, true
);

type Props = {
    onComplete?: (assetId: string) => void;
    onClose?: () => void;
};

export function AssetCreateDialog(props?: Props): JSXElement {
    const context = useEditorContext();

    async function handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = String(formData.get("assetName")) || "Asset";

        const file = formData.get("assetFile") as File;

        const assetId = await context.project.initAsset({name, file});

        if (props?.onComplete) props.onComplete(assetId);
    }

    return (
        <Dialog
            class={styles.AssetCreateDialog}
            title={i18next.t(
                "asset:AssetCreateDialog.dialogTitle",
                {postProcess: ["capitalize"]}
            )}
            onClose={props?.onClose}
        >
            <Form
                class={styles.ResourceForm}
                onSubmit={(event) => {void handleSubmit(event);}}
            >

                <Row>
                    <label for="assetName">
                        {i18next.t(
                            "asset:AssetCreateDialog.name",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <input
                        type="text"
                        id="assetName"
                        name="assetName"
                    />
                </Row>
                <Row>
                    <label for="assetFile">
                        {i18next.t(
                            "asset:AssetCreateDialog.file",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <input
                        type="file"
                        name="assetFile"
                        accept="image/*"
                    />
                </Row>

                <input type="submit"/>
            </Form>
        </Dialog>
    );
}