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

    /**
     * @param {HTMLElement} element
     */
    render(element) {
        this.modalLayer.innerHTML = "";
        this.modalLayer.appendChild(element);
    }
}