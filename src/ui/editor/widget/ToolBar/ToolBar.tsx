import styles from "./ToolBar.module.scss";
import MarkerIconSvg from "@public/icon/marker.svg";
import CursorIconSvg from "@public/icon/cursor.svg";

import {Button, Icon, Panel} from "@ui/widget";
import {For, JSXElement, createSignal} from "solid-js";
import {MarkerMode} from "@ui/marker/utility";
import {Mode} from "@ui/editor/utility";
import {useEditorContext} from "@ui/editor/context";

export function ToolBar(): JSXElement {
    const editorCtx = useEditorContext();
    const [selected, setSelected] = createSignal(0);

    const buttons = [
        {
            mode: new Mode(),
            icon: CursorIconSvg,
        },
        {
            mode: new MarkerMode(),
            icon: MarkerIconSvg,
        },
    ];

    return (
        <Panel class={styles.ToolBar}>
            <For each={buttons}>
                {(item, index) => (
                    <Button
                        icon={item.icon}
                        pressed={index() == selected()}
                        onClick={() => {
                            editorCtx.setMode(item.mode);
                            setSelected(index());
                        }}
                    />
                )}
            </For>
        </Panel>
    );
}