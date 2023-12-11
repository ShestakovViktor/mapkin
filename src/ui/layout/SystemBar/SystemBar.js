import styles from "./SystemBar.module.scss";
import SaveIconSvg from "@public/icon/save.svg";
import DownloadIconSvg from "@public/icon/download.svg";
import GearIconSvg from "@public/icon/gear.svg";
import en from "./string/en.json";

import {Icon, Button} from "@ui/feature/widget/component";
import i18next from "i18next";

i18next.addResourceBundle("en", "layout", {SystemBar: en}, true, true);


export function SystemBar() {
    const systemBar = document.createElement("div");
    systemBar.classList.add(styles.SystemBar);

    /**
     * Save project button
     */
    const saveProjectButton = Button({
        class: styles.Button,
        icon: Icon(SaveIconSvg),
        tooltip: i18next.t(
            "layout:SystemBar.saveProject",
            {postProcess: ["capitalize"]}
        ),
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
        tooltip: i18next.t(
            "layout:SystemBar.downloadProject",
            {postProcess: ["capitalize"]}
        ),
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
        tooltip: i18next.t(
            "layout:SystemBar.projectSettings",
            {postProcess: ["capitalize"]}
        ),
        onClick: () => {
            console.log("qweq");
        }
    });



    systemBar.appendChild(saveProjectButton);
    systemBar.appendChild(downloadProjectButton);
    systemBar.appendChild(projectSettingsButton);
    return systemBar;
}