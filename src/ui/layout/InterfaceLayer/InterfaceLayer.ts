import styles from "./InterfaceLayer.module.scss";
import {ToolBar, SystemBar, StatusBar, TitleBar} from "@ui/layout";


export function InterfaceLayer(): HTMLDivElement {
    const interfaceLayer = document.createElement("div");
    interfaceLayer.id = "interface";
    interfaceLayer.classList.add(styles.InterfaceLayer);




    interfaceLayer.appendChild(TitleBar());
    interfaceLayer.appendChild(SystemBar());
    interfaceLayer.appendChild(ToolBar());
    interfaceLayer.appendChild(StatusBar());

    return interfaceLayer;
}