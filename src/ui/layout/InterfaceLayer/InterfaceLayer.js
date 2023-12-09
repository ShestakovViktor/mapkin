import styles from "./InterfaceLayer.module.scss";
import {ToolBar} from "@src/ui/layout";

export function InterfaceLayer() {
    const interfaceLayer = document.createElement("div");
    interfaceLayer.id = "interface";
    interfaceLayer.classList.add(styles.InterfaceLayer);


    interfaceLayer.appendChild(ToolBar());

    return interfaceLayer;
}