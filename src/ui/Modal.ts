import styles from "@ui/layout/ModalLayer/ModalLayer.module.scss";

export class Modal {
    constructor(public modalLayer: HTMLElement) {
        this.modalLayer = modalLayer;
        this.modalLayer.classList.add(styles.Hidden);
    }

    show(element: HTMLElement): void {
        this.modalLayer.appendChild(element);
    }
}