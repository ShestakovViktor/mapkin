import MarkerIconSvg from "@public/icon/marker.svg";
import en from "./string/en.json";

import {JSXElement} from "solid-js";
import {Button} from "@ui/widget";
import i18next from "i18next";
import {useEditorContext} from "@src/ui/context";

i18next.addResourceBundle("en", "layout", {SystemBar: en}, true, true);

export function MarkerModeButton(): JSXElement {
    const context = useEditorContext();

    return (
        <Button
            icon={MarkerIconSvg}
            tooltip={i18next.t(
                "layout:ToolBar.markerMode",
                {postProcess: ["capitalize"]}
            )}
            onClick={(): void => {
                //context.input.setMode("marker");
            }}
        />
    );
}