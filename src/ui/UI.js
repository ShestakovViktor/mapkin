import {InterfaceLayer, ModalLayer} from "@ui/layout";
import {InitialDialog} from "@ui/feature/project/component";
import {Input, Media, Modal} from "@ui/utility";
import {createContext} from "@ui/context";


export class UI {
    /**
     * @param {HTMLElement} root
     * @param {import("@core").Core} core
     */
    constructor(root, core) {
        const modalLayer = ModalLayer();


        const context = createContext({
            modal: new Modal(modalLayer),
            input: new Input(core),
            core
        });


        const interfaceLayer = InterfaceLayer();

        root.appendChild(interfaceLayer);
        root.appendChild(modalLayer);


        context.modal.render(InitialDialog());
    }
}