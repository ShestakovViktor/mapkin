import en from "./string/en.json";
import styles from "./AssetSelectDialog.module.scss";
import SaltireIconSvg from "@public/icon/saltire.svg";

import {Button, Dialog} from "@ui/widget";
import {AssetCreateDialog} from "@ui/asset/widget/AssetCreateDialog";
import i18next from "i18next";
import {For, JSXElement, createEffect, createSignal, on} from "solid-js";
import {Modal} from "@ui/widget/Modal";
import {useViewerContext} from "@ui/viewer/context";
import {Asset} from "@type";

i18next.addResourceBundle("en", "asset", {"AssetSelectDialog": en}, true, true);

type Props = {
    onSelect?: (asset: string) => void;
    onComplete: () => void;
};

export function AssetSelectDialog(props: Props): JSXElement {
    const viewerCtx = useViewerContext();

    const getAssets = (): [string, Asset][] => Object
        .entries(viewerCtx.project().getAssets());

    const [assets, setAssets] = createSignal(getAssets());

    createEffect(on(viewerCtx.project, () => setAssets(getAssets())));

    const assetCreateModal = new Modal("#modal");
    assetCreateModal.render(
        <AssetCreateDialog
            onComplete={() => {
                assetCreateModal.hide();
                setAssets(Object.entries(viewerCtx.project().getAssets()));
            }}
            onClose={() => assetCreateModal.hide()}
        />
    );

    return (
        <Dialog
            class={styles.AssetSelectDialog}
            title={i18next.t(
                "asset:AssetSelectDialog.dialogTitle",
                {postProcess: ["capitalize"]}
            )}
            onClose={props.onComplete}
        >
            <div>
                <Button
                    label={i18next.t(
                        "asset:AssetSelectDialog.create",
                        {postProcess: ["capitalize"]}
                    )}
                    onClick={() => assetCreateModal.show()}
                />
            </div>
            <div>
                <For each={assets()}>
                    {([id, data]) =>
                        <div class={styles.AssetArea}>
                            <Button
                                class={styles.CloseButton}
                                icon={SaltireIconSvg}
                                onClick={() => {
                                    viewerCtx.project().delAsset(id);
                                }}
                            />
                            <img
                                src={viewerCtx.project().getSource(data.sourceId)}
                                onClick={() => {
                                    if (props.onSelect) props.onSelect(id);
                                    props.onComplete();
                                }}
                            />
                        </div>
                    }
                </For>
            </div>
        </Dialog>
    );
}