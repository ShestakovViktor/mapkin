import styles from "./DecorCreateDialog.module.scss";
import {Dialog, Column, Row, Form} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {AssetSelectDialog} from "@ui/asset/widget";
import {JSXElement} from "solid-js";
import {Modal} from "@ui/widget/Modal";
import {MODAL_ID} from "@ui/editor/widget";
import {MotionSelectDialog} from "@ui/motion/widget";
import {Id} from "@type";

i18next.addResourceBundle("en", "marker", {DecorCreateDialog: en}, true, true);

type Props = {
    onClose: () => void;
    onSubmit: (event: SubmitEvent) => void;
};

export function DecorCreateDialog(props: Props): JSXElement {
    let assetInput: HTMLInputElement | undefined;
    let motionInput: HTMLInputElement | undefined;

    const assetSelectModal = new Modal("#" + MODAL_ID);
    assetSelectModal.render(
        <AssetSelectDialog
            onSelect={(assetId: Id) => {
                if (assetInput) assetInput.value = assetId;
            }}
            onComplete={() => assetSelectModal.hide()}
        />
    );

    const motionSelectModal = new Modal("#" + MODAL_ID);
    motionSelectModal.render(
        <MotionSelectDialog
            onSelect={(motionId: Id) => {
                if (motionInput) motionInput.value = motionId;
            }}
            onComplete={() => motionSelectModal.hide()}
        />
    );

    return (
        <Dialog
            onClose={props.onClose}
            class={styles.DecorCreateDialog}
            title={i18next.t(
                "marker:DecorCreateDialog.dialogTitle",
                {postProcess: ["capitalize"]}
            )}
        >
            <Form
                class={styles.DecorForm}
                onSubmit={props.onSubmit}
            >
                <Row>
                    <input
                        type="button"
                        value={
                            i18next.t(
                                "marker:DecorCreateDialog.selectAsset",
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
                <Row>
                    <input
                        type="button"
                        value={
                            i18next.t(
                                "marker:DecorCreateDialog.selectMotion",
                                {postProcess: ["capitalize"]}
                            )}
                        onClick={() => motionSelectModal.show()}
                    />
                    <input
                        type="text"
                        name="motionId"
                        required
                        ref={motionInput}
                    />
                </Row>
                <input
                    type="submit"
                    value={i18next.t(
                        "marker:DecorCreateDialog.submit",
                        {postProcess: ["capitalize"]}
                    )}
                />
            </Form>
        </Dialog>
    );
}