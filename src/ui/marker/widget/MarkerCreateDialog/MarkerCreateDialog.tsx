import styles from "./MarkerCreateDialog.module.scss";
import {Dialog, Column, Row, Form} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {AssetSelectDialog} from "@ui/asset/widget";
import {JSXElement} from "solid-js";
import {Modal} from "@ui/widget/Modal";

i18next.addResourceBundle("en", "marker", {CreateMarkerDialog: en}, true, true);

type Props = {
    onClose: () => void;
    onSubmit: (event: SubmitEvent) => void;
};

export function MarkerCreateDialog(props: Props): JSXElement {
    let assetInput: HTMLInputElement | undefined;

    const assetSelectModal = new Modal("#modal");
    assetSelectModal.render(
        <AssetSelectDialog
            onSelect={(asset: string) => {
                if (assetInput) assetInput.value = asset;
            }}
            onComplete={() => assetSelectModal.hide()}
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
            <Form
                class={styles.MarkerForm}
                onSubmit={props.onSubmit}
            >

                <Row>
                    <input
                        type="button"
                        value={
                            i18next.t(
                                "marker:CreateMarkerDialog.chooseAsset",
                                {postProcess: ["capitalize"]}
                            )}
                        onClick={() => assetSelectModal.show()}
                    />
                    <input type="text" name="assetId" ref={assetInput}/>
                </Row>
                <Column>
                    <label for="markerText">
                        {i18next.t(
                            "marker:CreateMarkerDialog.text",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <textarea id="markerText" name="text"/>
                </Column>
                {/* <Row>
                    <label for="illustrationFile">
                        {i18next.t(
                            "marker:CreateMarkerDialog.illustration",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <input
                        type="file"
                        name="illustrationFile"
                        accept="image/*"
                    />
                </Row> */}
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