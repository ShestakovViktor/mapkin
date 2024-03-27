import {JSXElement, createRenderEffect, on, onMount} from "solid-js";
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
import {useViewerContext} from "@ui/viewer/context";
import {useEditorContext} from "@ui/editor/context";

export function Editor(): JSXElement {
    const viewerCtx = useViewerContext();
    const editorCtx = useEditorContext();
    let ref: HTMLDivElement;

    // createRenderEffect(on(viewerCtx.view, () => {
    // viewerCtx.view()?.addEventListener("click",  (e) => {
    //     editorCtx.mode().onMouseClick(e);
    // });
    // }));

    onMount(() => {
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