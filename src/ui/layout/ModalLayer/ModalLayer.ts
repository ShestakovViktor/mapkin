import styles from "./ModalLayer.module.scss";

export function ModalLayer(): HTMLDivElement {
    const modalLayer = document.createElement("div");
    modalLayer.id = "modal";
    modalLayer.classList.add(styles.ModalLayer);

    const observer = new MutationObserver(() => {
        if (!modalLayer.childNodes.length) {
            modalLayer.classList.add(styles.Hidden);
        }
        else {
            modalLayer.classList.remove(styles.Hidden);
        }
    });

    observer.observe(modalLayer, {childList: true});

    return modalLayer;
}