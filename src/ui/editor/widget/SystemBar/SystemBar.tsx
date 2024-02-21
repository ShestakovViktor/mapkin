import {Panel} from "@ui/widget";
import styles from "./SystemBar.module.scss";
import {
    ProjectExportButton,
    ProjectCompileButton,
    ProjectMenuButton,
} from "@src/ui/project/widget";
import {JSXElement} from "solid-js";

export function SystemBar(): JSXElement {
    return (
        <Panel class={styles.SystemBar}>
            <ProjectExportButton/>
            <ProjectCompileButton/>
            <ProjectMenuButton/>
        </Panel>
    );
}