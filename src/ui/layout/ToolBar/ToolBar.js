import styles from "./ToolBar.module.scss";
import CursorIconSvg from "@public/icon/cursor.svg";
import MarkerIconSvg from "@public/icon/marker.svg";
import en from "./string/en.json";

import {Icon, Button} from "@ui/feature/widget/component";
import {useContext} from "@ui/context";

import i18next from "i18next";

i18next.addResourceBundle("en", "layout", {ToolBar: en}, true, true);


export function ToolBar() {
    const context = useContext();
    const toolBar = document.createElement("div");
    toolBar.classList.add(styles.ToolBar);

    [
        {
            class: styles.Button,
            icon: Icon(CursorIconSvg),
            tooltip: i18next.t(
                "layout:ToolBar.selectMode",
                {postProcess: ["capitalize"]}
            ),
            onClick: () => {
                context.input.setMode("select");
            }
        },
        {
            class: styles.Button,
            icon: Icon(MarkerIconSvg),
            tooltip: i18next.t(
                "layout:ToolBar.markerMode",
                {postProcess: ["capitalize"]}
            ),
            onClick: () => {
                context.input.setMode("marker");
            }
        }
    ].forEach((data) => toolBar.appendChild(Button(data)));

    return toolBar;
}