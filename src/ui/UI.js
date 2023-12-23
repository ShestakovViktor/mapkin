import {InterfaceLayer, ModalLayer} from "@ui/layout";
import {InitialDialog} from "@ui/feature/project/component";
import {Input, Modal} from "@ui";
import {createContext} from "@ui/context";


export class UI {
    /**
     * @param {HTMLElement} root
     * @param {import("@core").Core} core
     */
    constructor(root, core) {
        const modalLayer = ModalLayer();

        const modal = new Modal(modalLayer);
        const input = new Input(core, modal);


        const context = createContext({modal, input, core});


        const interfaceLayer = InterfaceLayer();

        root.appendChild(interfaceLayer);
        root.appendChild(modalLayer);


        context.modal.render(InitialDialog());
    }
}