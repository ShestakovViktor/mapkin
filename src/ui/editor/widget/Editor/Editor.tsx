import {JSX, onMount} from "solid-js";
import styles from "./Editor.module.scss";
import {
    ModalLayer,
    DockArea,
    ToolKit,
    WorkSpace,
    ToolBar,
    SystemKit,
} from "@src/ui/editor/widget";
import {InitialDialog} from "@ui/project/widget";
import {Modal} from "@ui/widget/Modal";
import {useEditorContext} from "@ui/editor/context";
import {VIEWER_ID} from "@ui/viewer/widget";
import {FormMode} from "@ui/editor/utility";
import {ToolbarMode} from "@ui/editor/utility/ToolbarMode";

type Props = {
    children: JSX.Element;
};

export function Editor(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    editorCtx.formMode = new FormMode();
    editorCtx.toolbarMode = new ToolbarMode();

    onMount(() => {
        const viewer = document.querySelector("#" + VIEWER_ID);
        if (!viewer) throw new Error();
        viewer.addEventListener("click", (e) => {
            console.log("click");
            editorCtx.getIOMode().onMouseClick(e as MouseEvent);
        });

        const initialDialogModal = new Modal({background: true});
        initialDialogModal.render(
            <InitialDialog onComplete={() => initialDialogModal.hide()}/>
        );
        initialDialogModal.show();
    });

    return (
        <div id="editor" class={styles.Editor}>
            <WorkSpace>
                {props.children}
                <ToolBar/>
            </WorkSpace>
            <SystemKit/>
            <ToolKit/>
            <DockArea/>
            <ModalLayer/>
        </div>
    );
}