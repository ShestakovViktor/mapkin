import styles from "./ToolBar.module.scss";
import {Icon, Button} from "@ui/feature/widget/component";
import MarkerIconSvg from "@public/icon/marker.svg";
import DownloadIconSvg from "@public/icon/download.svg";


export function ToolBar() {
    const toolBar = document.createElement("div");
    toolBar.classList.add(styles.ToolBar);

    console.log(styles.ToolBar);


    /**
     * Add marker button
     */
    const addMarkerButton = Button({
        class: styles.Button,
        icon: Icon(MarkerIconSvg),
        onClick: () => {
            console.log("qweq");
        }
    });


    /**
     * Download project button
     */
    const downloadProjectButton = Button({
        class: styles.Button,
        icon: Icon(DownloadIconSvg),
        onClick: () => {
            console.log("qweq");
        }
    });


    toolBar.appendChild(addMarkerButton);
    toolBar.appendChild(downloadProjectButton);
    return toolBar;
}