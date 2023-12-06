import styles from "./ModalLayer.module.scss";


export function ModalLayer() {
    const modalLayer = document.createElement("div");
    modalLayer.id = "modal";
    modalLayer.classList.add(styles.ModalLayer);

    return modalLayer;
}