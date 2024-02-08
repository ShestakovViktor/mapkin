import en from "./string/en.json";
import styles from "./AssetSelectDialog.module.scss";
import {Dialog, Field, Input} from "@src/ui/widget";
import {useContext} from "@ui/context";
import {AssetCreateDialog} from "../AssetCreateDialog";
import i18next from "i18next";

i18next.addResourceBundle("en", "asset", {"AssetManager": en}, true, true);

type Props = {
    onSelect: (asset: string) => void;
};

export function AssetSelectDialog(props: Props): HTMLDivElement {
    const context = useContext();

    const assets = context.core.project.getAssets();
    const assetsElements: HTMLElement[] = [];

    for (const id in assets) {
        const asset = assets[id];
        const image = document.createElement("img");
        image.src = context.core.project.getSource(asset.sourceId);
        image.onclick = (event: MouseEvent): void => {
            props.onSelect(id);
            const target = event.currentTarget as HTMLElement;
            target.parentElement?.parentElement?.remove();
        };
        assetsElements.push(image);
    }

    return Dialog({
        class: styles.AssetSelectDialog,
        children: [
            Field({
                children: [
                    Input({
                        type: "button",
                        value: i18next.t(
                            "asset:AssetManager.create",
                            {postProcess: ["capitalize"]}
                        ),
                        onClick: (event) => context.modal.show(AssetCreateDialog()),
                    }),
                ],
            }),
            Field({children: assetsElements}),
        ],
    });
}