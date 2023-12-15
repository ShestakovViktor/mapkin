import styles from "./SystemBar.module.scss";
import DisketteIconSvg from "@public/icon/diskette.svg";
import DownloadIconSvg from "@public/icon/download.svg";
import GearIconSvg from "@public/icon/gear.svg";
import en from "./string/en.json";
import JSZip from "jszip";

import {Icon, Button} from "@ui/feature/widget/component";
import i18next from "i18next";
import {useContext} from "@ui/context";

i18next.addResourceBundle("en", "layout", {SystemBar: en}, true, true);


export function SystemBar() {
    const context = useContext();

    const systemBar = document.createElement("div");
    systemBar.classList.add(styles.SystemBar);

    async function handleProjectExport() {
        const projectFile = await context.core.exportProject();

        const projectFileUrl = URL.createObjectURL(projectFile);

        const tempLink = document.createElement("a");
        tempLink.download = projectFile.name;
        tempLink.href = projectFileUrl;
        tempLink.click();
        tempLink.remove();
    }

    async function handleProjectCompile() {
        const websiteArchive = await context.core.exportProjectAsSite();

        const projectFileUrl = URL.createObjectURL(websiteArchive);

        const tempLink = document.createElement("a");
        tempLink.download = websiteArchive.name;
        tempLink.href = projectFileUrl;
        tempLink.click();
        tempLink.remove();

    }

    [
        {
            class: styles.Button,
            icon: Icon(DisketteIconSvg),
            tooltip: i18next.t(
                "layout:SystemBar.exportProject",
                {postProcess: ["capitalize"]}
            ),
            onClick: handleProjectExport
        },
        {
            class: styles.Button,
            icon: Icon(DownloadIconSvg),
            tooltip: i18next.t(
                "layout:SystemBar.compileProject",
                {postProcess: ["capitalize"]}
            ),
            onClick: handleProjectCompile
        },
        {
            class: styles.Button,
            icon: Icon(GearIconSvg),
            tooltip: i18next.t(
                "layout:SystemBar.projectSettings",
                {postProcess: ["capitalize"]}
            ),
            onClick: () => {
                console.log("qweq");
            }
        }
    ].forEach((data) => systemBar.appendChild(Button(data)));


    return systemBar;
}