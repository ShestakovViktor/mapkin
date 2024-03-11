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
import {Project} from "@project";

export function Editor(): JSXElement {
    const viewerCtx = useViewerContext();
    const editorCtx = useEditorContext();
    let ref: HTMLDivElement;

    createRenderEffect(on(viewerCtx.root, () => {
        viewerCtx.root()?.addEventListener("click",  (e) => {
            editorCtx.mode().onMouseClick(e);
        });
    }));

    onMount(() => {
        const initialDialogModal = new Modal("#modal");
        initialDialogModal.render(
            <InitialDialog onComplete={() => initialDialogModal.hide()}/>
        );
        initialDialogModal.show();

        // fetch("/project.mp")
        //     .then((response) => response.blob())
        //     .then(async (file) => {
        //         const project = new Project();
        //         await project.import(file);
        //         viewerCtx.setProject(project);
        //         viewerCtx.reRender();
        //     })
        //     .catch((err) => {
        //         throw new Error(err);
        //     });
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