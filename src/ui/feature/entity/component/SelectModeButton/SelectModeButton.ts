import CursorIconSvg from "@public/icon/cursor.svg";
import en from "./string/en.json";

import {Icon, Button} from "@ui/widget";
import i18next from "i18next";
import {useContext} from "@ui/context";

i18next.addResourceBundle("en", "layout", {SystemBar: en}, true, true);

export function SelectModeButton(): HTMLButtonElement {
    const context = useContext();

    return Button({
        type: "PanelButton",
        icon: Icon(CursorIconSvg),
        tooltip: i18next.t(
            "layout:ToolBar.markerMode",
            {postProcess: ["capitalize"]}
        ),
        onClick: (): void => {
            context.input.setMode("select");
        },
    });
}