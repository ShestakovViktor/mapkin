import styles from "./ToolBar.module.scss";

import {Panel} from "@ui/widget";
import {MarkerModeButton} from "@ui/feature/marker/component";
import {SelectModeButton} from "@ui/feature/entity/component";

export function ToolBar(): HTMLDivElement {
    return Panel({
        class: styles.ToolBar,
        children: [
            SelectModeButton(),
            MarkerModeButton(),
        ],
    });
}