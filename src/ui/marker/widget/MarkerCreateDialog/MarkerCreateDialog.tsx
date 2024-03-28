import styles from "./MarkerCreateDialog.module.scss";
import {Dialog, Column, Row, Form} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {AssetSelectDialog} from "@ui/asset/widget";
import {JSXElement} from "solid-js";
import {Modal} from "@ui/widget/Modal";

i18next.addResourceBundle("en", "marker", {MarkerCreateDialog: en}, true, true);

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
            class={styles.MarkerCreateDialog}
            title={i18next.t(
                "marker:MarkerCreateDialog.dialogTitle",
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
                                "marker:MarkerCreateDialog.chooseAsset",
                                {postProcess: ["capitalize"]}
                            )}
                        onClick={() => assetSelectModal.show()}
                    />
                    <input
                        type="text"
                        name="assetId"
                        required
                        ref={assetInput}
                    />
                </Row>
                <Column>
                    <label for="text">
                        {i18next.t(
                            "marker:MarkerCreateDialog.text",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <textarea id="text" name="text"/>
                </Column>
                <Row>
                    {/* <label for="graphic">
                        {i18next.t(
                            "marker:MarkerCreateDialog.graphic",
                            {postProcess: ["capitalize"]}
                        )}
                    </label> */}
                    <input
                        id="graphic"
                        type="file"
                        name="graphic"
                        accept="image/*"
                        multiple
                    />
                </Row>
                <input
                    type="submit"
                    value={i18next.t(
                        "marker:MarkerCreateDialog.createMarker",
                        {postProcess: ["capitalize"]}
                    )}
                />
            </Form>
        </Dialog>
    );
}