import styles from "./ToolBar.module.scss";

import {Panel} from "@ui/widget";
import {SelectModeButton} from "@src/ui/entity/widget";
import {MarkerModeButton} from "@src/ui/marker/widget";
import {JSXElement} from "solid-js";

export function ToolBar(): JSXElement {
    return (
        <Panel class={styles.ToolBar}>
            <SelectModeButton/>
            <MarkerModeButton/>
        </Panel>
    );
}