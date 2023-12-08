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

}