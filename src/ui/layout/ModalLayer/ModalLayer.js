import styles from "./ModalLayer.module.scss";


export function ModalLayer() {
    const ModalLayer = document.createElement("div");
    ModalLayer.classList.add(styles.ModalLayer);

    return ModalLayer;
}