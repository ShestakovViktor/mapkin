import styles from "./ModalLayer.module.scss";
import {JSXElement, onMount} from "solid-js";

export const MODAL_ID = "modal";
export function ModalLayer(): JSXElement {
    let modalLayer: HTMLDivElement;

    onMount(() => {
        const observer = new MutationObserver(() => {
            if (!modalLayer.childNodes.length) {
                modalLayer.classList.add(styles.Hidden);
            }
            else {
                modalLayer.classList.remove(styles.Hidden);
            }
        });

        observer.observe(modalLayer, {childList: true});
    });

    return (
        <div
            id={MODAL_ID}
            class={`${styles.ModalLayer} ${styles.Hidden}`}
            ref={modalLayer!}
        >
        </div>
    );
}