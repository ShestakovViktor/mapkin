import styles from "./AssetCreateDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {Dialog, Form, Row} from "@ui/widget";
import {JSXElement} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";

i18next.addResourceBundle(
    "en", "asset", {AssetCreateDialog: en}, true, true
);

type Props = {
    onComplete?: (assetId: string) => void;
    onClose?: () => void;
};

export function AssetCreateDialog(props?: Props): JSXElement {
    const context = useViewerContext();

    async function handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        form.reset();

        const name = String(formData.get("name")) || "Asset";
        const width = Number(formData.get("width"));
        const height = Number(formData.get("height"));
        const file = formData.get("file") as File;

        const assetId = await context.project()
            .initAsset({name, file, width, height});

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
                    <label for="name">
                        {i18next.t(
                            "asset:AssetCreateDialog.name",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                    />
                </Row>
                <Row>
                    <label for="width">
                        {i18next.t(
                            "asset:AssetCreateDialog.width",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <input id="width" type="text" name="width"/>
                </Row>
                <Row>
                    <label for="height">
                        {i18next.t(
                            "asset:AssetCreateDialog.height",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <input id="height" type="text" name="height"/>
                </Row>
                <Row>
                    <label for="file">
                        {i18next.t(
                            "asset:AssetCreateDialog.file",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                    />
                </Row>

                <input type="submit"/>
            </Form>
        </Dialog>
    );
}