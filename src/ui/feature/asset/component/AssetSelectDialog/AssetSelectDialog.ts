import en from "./string/en.json";
import styles from "./AssetSelectDialog.module.scss";
import SaltireIconSvg from "@public/icon/saltire.svg";

import {Area, Button, Dialog, Image} from "@src/ui/widget";
import {useContext} from "@ui/context";
import {AssetCreateDialog} from "../AssetCreateDialog";
import i18next from "i18next";

i18next.addResourceBundle("en", "asset", {"AssetSelectDialog": en}, true, true);

type Props = {
    onSelect?: (asset: string) => void;
};

export function AssetSelectDialog(props?: Props): HTMLDivElement {
    const context = useContext();

    const collection = context.core.project.getAssets();
    const assets: HTMLElement[] = [];

    for (const id in collection) {
        const data = collection[id];

        const deleteAssetButton = Button({
            class: styles.CloseButton,
            icon: SaltireIconSvg,
            onClick: () => {
                context.core.project.delAsset(id);
            },
        });

        const assetPreviewImage = Image({
            src: context.core.project.getSource(data.sourceId),
            onClick: () => {
                if (props?.onSelect) props.onSelect(id);
            },
        });

        const asset = Area({
            class: styles.AssetArea,
            children: [deleteAssetButton, assetPreviewImage],
        });

        assets.push(asset);
    }

    const assetCreateButton = Button({
        label: i18next.t(
            "asset:AssetSelectDialog.create",
            {postProcess: ["capitalize"]}
        ),
        onClick: () => {
            context.modal.show(AssetCreateDialog());
        },
    });

    return Dialog({
        class: styles.AssetSelectDialog,
        title: i18next.t(
            "asset:AssetSelectDialog.dialogTitle",
            {postProcess: ["capitalize"]}
        ),
        children: [
            Area({children: [assetCreateButton]}),
            Area({children: assets}),
        ],
    });
}