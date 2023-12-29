import styles from "@ui/layout/ModalLayer/ModalLayer.module.scss";

export class Modal {

    constructor(public modalLayer: HTMLElement) {
        this.modalLayer = modalLayer;
    }

    show(element: HTMLElement): void {
        this.modalLayer.innerHTML = "";
        this.modalLayer.appendChild(element);
        this.modalLayer.classList.remove(styles.Hidden);
    }

    hide(): void {
        this.modalLayer.classList.add(styles.Hidden);
        this.modalLayer.innerHTML = "";
    }
}