import {UILayer, ModalLayer} from "@ui/layout";
import {InitialDialog} from "@ui/feature/project/component";
import {Modal} from "@ui/utility";


export class UI {
    /**
     * @param {HTMLElement} root
     * @param {import("@core").Core} core
     */
    constructor(root, core) {
        const modalLayer = ModalLayer();

        /**
         * @type {import("@ui/type").Context}
         */
        const context = {
            modal: new Modal(modalLayer),
        };


        const uiLayer = UILayer(context);

        root.appendChild(uiLayer);
        root.appendChild(modalLayer);


        context.modal.render(InitialDialog(core));
    }
}