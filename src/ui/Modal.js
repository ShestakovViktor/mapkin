import styles from "@ui/layout/ModalLayer/ModalLayer.module.scss";

export class Modal {

    /** @param {HTMLElement} modalLayer */
    constructor(modalLayer) {

        /** @private */
        this.modalLayer = modalLayer;
    }

    /**
     * @param {HTMLElement} element
     */
    render(element) {
        this.modalLayer.innerHTML = "";
        this.modalLayer.appendChild(element);
        this.modalLayer.classList.remove(styles.Hidden);
    }

    hide() {
        this.modalLayer.classList.add(styles.Hidden);
    }
}