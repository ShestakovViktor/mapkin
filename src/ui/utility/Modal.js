import styles from "@ui/layout/ModalLayer/ModalLayer.module.scss";

export class Modal {
    /**
     * @param {HTMLElement} modalLayer
     */
    constructor(modalLayer) {
        /**
         * @private
         */
        this.modalLayer = modalLayer;
    }

    clear() {
        this.modalLayer.innerHTML = "";
    }

    /**
     * @param {HTMLElement} element
     */
    render(element) {
        this.clear();
        this.modalLayer.appendChild(element);
    }

    hide() {
        this.clear();
        this.modalLayer.classList.add(styles.Hidden);
    }
}