import styles from "./SystemBar.module.scss";
import DownloadIconSvg from "@public/icon/download.svg";
import GearIconSvg from "@public/icon/gear.svg";

import {Icon, Button} from "@ui/feature/widget/component";


export function SystemBar() {
    const systemBar = document.createElement("div");
    systemBar.classList.add(styles.SystemBar);

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

    /**
     * Project settings button
     */
    const projectSettingsButton = Button({
        class: styles.Button,
        icon: Icon(GearIconSvg),
        onClick: () => {
            console.log("qweq");
        }
    });



    systemBar.appendChild(downloadProjectButton);
    systemBar.appendChild(projectSettingsButton);
    return systemBar;
}