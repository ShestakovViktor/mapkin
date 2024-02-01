import {InterfaceLayer, ModalLayer} from "@ui/layout/";
import {InitialDialog} from "@ui/feature/project/component";
import {Input, Modal} from "@ui";
import {createContext} from "@ui/context";
import {Core} from "@core";

export class UI {

    constructor(root: HTMLElement, core: Core) {
        const modalLayer = ModalLayer();

        const modal = new Modal(modalLayer);
        const input = new Input(core, modal);

        const context = createContext({modal, input, core});

        const interfaceLayer = InterfaceLayer();

        // core.viewer.map.addEventListener("click", (event) => {
        //     context.input.onMouseClick(event);
        // });

        root.appendChild(interfaceLayer);
        root.appendChild(modalLayer);

        context.modal.show(InitialDialog());
    }
}