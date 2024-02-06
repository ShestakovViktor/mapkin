import MarkerIconSvg from "@public/icon/marker.svg";
import en from "./string/en.json";

import {Icon, Button} from "@ui/widget";
import i18next from "i18next";
import {useContext} from "@ui/context";

i18next.addResourceBundle("en", "layout", {SystemBar: en}, true, true);

export function MarkerModeButton(): HTMLButtonElement {
    const context = useContext();

    return Button({
        type: "PanelButton",
        icon: Icon(MarkerIconSvg),
        tooltip: i18next.t(
            "layout:ToolBar.markerMode",
            {postProcess: ["capitalize"]}
        ),
        onClick: (): void => {
            context.input.setMode("marker");
        },
    });
}