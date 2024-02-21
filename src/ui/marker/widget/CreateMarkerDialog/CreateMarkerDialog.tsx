import styles from "./CreateMarkerDialog.module.scss";
import {Dialog, Column, Row, Form} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {AssetSelectDialog} from "@ui/asset/widget";
import {JSXElement} from "solid-js";
import {createModalWidget} from "@src/ui/modal/utility";

i18next.addResourceBundle("en", "marker", {CreateMarkerDialog: en}, true, true);

type Props = {
    onClose: () => void;
    onSubmit: (event: SubmitEvent) => void;
};

export function CreateMarkerDialog(props: Props): JSXElement {
    let assetInput: HTMLInputElement | undefined;

    const modal = createModalWidget();
    modal.render(
        <AssetSelectDialog
            onSelect={(asset: string) => {
                if (assetInput) assetInput.value = asset;
            }}
            onComplete={modal.hide}
        />
    );

    return (
        <Dialog
            onClose={props.onClose}
            class={styles.CreateMarkerDialog}
            title={i18next.t(
                "marker:CreateMarkerDialog.dialogTitle",
                {postProcess: ["capitalize"]}
            )}
        >
            <Form class={styles.MarkerForm}>
                <Column>
                    <label for="markerText">
                        {i18next.t(
                            "marker:CreateMarkerDialog.text",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <textarea id="markerText" name="markerText"/>
                </Column>

                <Row>
                    <input
                        type="button"
                        value={
                            i18next.t(
                                "marker:CreateMarkerDialog.chooseAsset",
                                {postProcess: ["capitalize"]}
                            )}
                        onClick={modal.show}
                    />
                    <input type="text" name="assetId" ref={assetInput}/>
                </Row>

                <input
                    type="submit"
                    value={i18next.t(
                        "marker:CreateMarkerDialog.createMarker",
                        {postProcess: ["capitalize"]}
                    )}
                />
            </Form>
        </Dialog>
    );
}