import {JSXElement, onMount} from "solid-js";
import styles from "./Editor.module.scss";
import {
    ToolBar,
    SystemBar,
    StatusBar,
    TitleBar,
    ModalLayer,
} from "@src/ui/editor/widget";
import {InitialDialog} from "@ui/project/widget";
import {Modal} from "@ui/widget/Modal";
import {useEditorContext} from "@ui/editor/context";
import {VIEWER_ID} from "@ui/viewer/widget";

export function Editor(): JSXElement {
    const editorCtx = useEditorContext();
    let ref: HTMLDivElement;

    onMount(() => {
        const viewer = document.querySelector("#" + VIEWER_ID);
        if (!viewer) throw new Error();
        viewer.addEventListener("click", (e) => {
            editorCtx.mode().onMouseClick(e as MouseEvent);
        });

        const initialDialogModal = new Modal("#modal");
        initialDialogModal.render(
            <InitialDialog onComplete={() => initialDialogModal.hide()}/>
        );
        initialDialogModal.show();
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