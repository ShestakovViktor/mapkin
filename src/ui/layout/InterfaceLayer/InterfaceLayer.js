import {useContext} from "@ui/context";
import styles from "./InterfaceLayer.module.scss";
import {StatusBar, ToolBar} from "@ui/layout";


export function InterfaceLayer() {
    const context = useContext();

    const interfaceLayer = document.createElement("div");
    interfaceLayer.id = "interface";
    interfaceLayer.classList.add(styles.InterfaceLayer);

    interfaceLayer.addEventListener("mousedown", (event) => {
        context.core.mode.onMouseDown(event);
    });


    interfaceLayer.appendChild(ToolBar());
    interfaceLayer.appendChild(StatusBar());

    return interfaceLayer;
}