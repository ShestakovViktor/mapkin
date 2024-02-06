import {Panel} from "@ui/widget";
import styles from "./SystemBar.module.scss";
import {
    ProjectExportButton,
    ProjectCompileButton,
    ProjectMenuButton,
} from "@ui/feature/project/component";

export function SystemBar(): HTMLDivElement {
    return Panel({
        class: styles.SystemBar,
        children: [
            ProjectExportButton(),
            ProjectCompileButton(),
            ProjectMenuButton(),
        ],
    });
}