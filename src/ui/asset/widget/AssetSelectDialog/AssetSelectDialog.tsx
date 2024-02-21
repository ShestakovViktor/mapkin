import en from "./string/en.json";
import styles from "./AssetSelectDialog.module.scss";
import SaltireIconSvg from "@public/icon/saltire.svg";

import {Button, Dialog} from "@src/ui/widget";
import {useEditorContext} from "@src/ui/context";
import {AssetCreateDialog} from "../AssetCreateDialog";
import i18next from "i18next";
import {For, JSXElement, createEffect, createResource, on} from "solid-js";
import {createModalWidget} from "@src/ui/modal/utility";

i18next.addResourceBundle("en", "asset", {"AssetSelectDialog": en}, true, true);

type Props = {
    onSelect?: (asset: string) => void;
    onComplete: () => void;
};

export function AssetSelectDialog(props: Props): JSXElement {
    const context = useEditorContext();

    const [assets, {refetch}] = createResource(() => {
        return Object.entries(context.foo().getAssets());
    });

    createEffect(on(context.foo, async () => {
        await refetch();
    }));

    const assetCreateModal = createModalWidget();
    assetCreateModal.render(
        <AssetCreateDialog
            onComplete={() => {
                assetCreateModal.hide();
                Promise.resolve(refetch())
                    .catch(err => console.log());
            }}
            onClose={assetCreateModal.hide}
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
                    onClick={assetCreateModal.show}
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
                                    context.project.delAsset(id);
                                }}
                            />
                            <img
                                src={context.project.getSource(data.sourceId)}
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