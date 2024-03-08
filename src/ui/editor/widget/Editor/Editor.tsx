import {JSXElement, createEffect, on, onMount} from "solid-js";
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

export function Editor(): JSXElement {
    const context = useEditorContext();
    let ref: HTMLDivElement;

    createEffect(on(context.project, () => {
        const map = document.querySelector("#root");
        if (!map) throw new Error();

        map.addEventListener("click",  (e) => {
            context.mode().onMouseClick(e as MouseEvent);
        });
    }));

    onMount(() => {
        const initialDialogModal = new Modal("#modal");
        initialDialogModal.render(
            <InitialDialog onComplete={initialDialogModal.hide}/>
        );
        // initialDialogModal.show();
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