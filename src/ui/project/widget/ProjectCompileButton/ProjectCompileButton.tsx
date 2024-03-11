import DownloadIconSvg from "@public/icon/download.svg";
import en from "./string/en.json";

import {Button} from "@ui/widget";
import i18next from "i18next";
import {JSXElement} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";

i18next.addResourceBundle("en", "layout", {SystemBar: en}, true, true);

export function ProjectCompileButton(): JSXElement {
    const context = useViewerContext();

    async function handleProjectCompile(): Promise<void> {
        const websiteArchive = await context.project().exportProjectAsSite();

        const projectFileUrl = URL.createObjectURL(websiteArchive);

        const tempLink = document.createElement("a");
        tempLink.download = "project.zip";
        tempLink.href = projectFileUrl;
        tempLink.click();
        tempLink.remove();
    }

    return (
        <Button
            icon={ DownloadIconSvg }
            tooltip={i18next.t(
                "layout:SystemBar.compileProject",
                {postProcess: ["capitalize"]}
            )}
            onClick={() => void handleProjectCompile()}
        />
    );
}