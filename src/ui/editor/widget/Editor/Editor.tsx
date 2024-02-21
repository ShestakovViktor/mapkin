import {JSXElement, onMount} from "solid-js";
import styles from "./Editor.module.scss";
import {
    ToolBar,
    SystemBar,
    StatusBar,
    TitleBar,
} from "@src/ui/editor/widget";
import {InitialDialog} from "@src/ui/project/widget/InitialDialog";
import {createModalWidget} from "../../../modal/utility";
import {ModalLayer} from "@src/ui/modal/widget";
import {MarkerMode} from "@src/ui/marker/utility";
import {useEditorContext} from "@src/ui/context";

export function Editor(): JSXElement {
    const context = useEditorContext();
    let ref: HTMLDivElement;
    const mode = MarkerMode(context.project, context.core);

    onMount(() => {
        const modal = createModalWidget();
        modal.render(<InitialDialog onComplete={modal.hide}/>);
        //modal.show();

        ref.addEventListener("click",  mode.onMouseClick);

    });

    return (
        <div id="editor" class={styles.Editor}>
            <div id="interface" class={styles.Interface} ref={ref!}>
                <TitleBar/>
                <SystemBar/>
                <ToolBar/>
                <StatusBar/>
            </div>

            <ModalLayer/>
        </div>
    );
}