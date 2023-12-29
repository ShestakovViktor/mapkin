import styles from "./ModalLayer.module.scss";


export function ModalLayer(): HTMLDivElement {
    const modalLayer = document.createElement("div");
    modalLayer.classList.add(styles.ModalLayer, styles.Hidden);

    return modalLayer;
}