import DisketteIconSvg from "@public/icon/diskette.svg";

import {Icon, Button} from "@ui/widget";
import i18next from "i18next";
import {useContext} from "@ui/context";

export function ProjectExportButton(): HTMLButtonElement {
    const context = useContext();

    async function handleProjectExport(): Promise<void> {
        const projectFile = await context.core.exportProject();

        const projectFileUrl = URL.createObjectURL(projectFile);

        const tempLink = document.createElement("a");
        tempLink.download = "project.mp";
        tempLink.href = projectFileUrl;
        tempLink.click();
        tempLink.remove();
    }

    return Button({
        type: "PanelButton",
        icon: Icon(DisketteIconSvg),
        tooltip: i18next.t(
            "layout:SystemBar.exportProject",
            {postProcess: ["capitalize"]}
        ),
        onClick: () => void handleProjectExport(),
    });
}