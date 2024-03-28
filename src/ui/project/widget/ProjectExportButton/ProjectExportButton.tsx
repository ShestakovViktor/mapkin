import DisketteIconSvg from "@public/icon/diskette.svg";

import {Button} from "@ui/widget";
import i18next from "i18next";
import {JSXElement} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";
import {useEditorContext} from "@ui/editor/context";

export function ProjectExportButton(): JSXElement {
    const editorCtx = useEditorContext();

    async function handleProjectExport(): Promise<void> {
        const projectFile = await editorCtx.core.converter.exportAsFile();

        const projectFileUrl = URL.createObjectURL(projectFile);

        const tempLink = document.createElement("a");
        tempLink.download = "project.mp";
        tempLink.href = projectFileUrl;
        tempLink.click();
        tempLink.remove();
    }

    return (
        <Button
            icon={ DisketteIconSvg }
            tooltip={i18next.t(
                "layout:SystemBar.exportProject",
                {postProcess: ["capitalize"]}
            )}
            onClick={() => void handleProjectExport()}
        />
    );
}