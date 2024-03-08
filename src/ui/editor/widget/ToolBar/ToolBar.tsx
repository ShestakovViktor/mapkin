import styles from "./ToolBar.module.scss";
import MarkerIconSvg from "@public/icon/marker.svg";
import CursorIconSvg from "@public/icon/cursor.svg";

import {Button, Icon, Panel} from "@ui/widget";
import {For, JSXElement, createSignal} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {MarkerMode} from "@ui/marker/utility";
import {Mode} from "@ui/editor/utility";

export function ToolBar(): JSXElement {
    const context = useEditorContext();
    const [selected, setSelected] = createSignal(0);

    const buttons = [
        {
            mode: new Mode(),
            icon: CursorIconSvg,
        },
        {
            mode: new MarkerMode(context.project(), context.core),
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
                            context.setMode(item.mode);
                            setSelected(index());
                        }}
                    />
                )}
            </For>
        </Panel>
    );
}