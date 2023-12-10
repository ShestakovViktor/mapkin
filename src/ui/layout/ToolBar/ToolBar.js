import styles from "./ToolBar.module.scss";
import SelectIconSvg from "@public/icon/select.svg";
import MarkerIconSvg from "@public/icon/marker.svg";

import {Icon, Button} from "@ui/feature/widget/component";
import {useContext} from "@ui/context";


export function ToolBar() {
    const context = useContext();
    const toolBar = document.createElement("div");
    toolBar.classList.add(styles.ToolBar);

    console.log(styles.ToolBar);

    /**
     * Select mode button
     */
    const selectModeButton = Button({
        class: styles.Button,
        icon: Icon(SelectIconSvg),
        onClick: () => {
            context.core.io.setMode("select");
        }
    });


    /**
     * Add marker button
     */
    const addMarkerButton = Button({
        class: styles.Button,
        icon: Icon(MarkerIconSvg),
        onClick: () => {
            context.core.io.setMode("marker");
        }
    });


    toolBar.appendChild(selectModeButton);
    toolBar.appendChild(addMarkerButton);
    return toolBar;
}