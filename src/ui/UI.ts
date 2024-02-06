import {InterfaceLayer, ModalLayer} from "@ui/layout/";
import {InitialDialog} from "@ui/feature/project/component";
import {Input, Modal} from "@ui";
import {createContext} from "@ui/context";
import {Core} from "@core";
import {Viewer} from "@viewer";

export class UI {

    constructor(root: HTMLElement, viewer: Viewer, core: Core) {
        const modalLayer = ModalLayer();

        const modal = new Modal(modalLayer);
        const input = new Input(viewer, core, modal);

        const context = createContext({modal, input, viewer, core});

        const interfaceLayer = InterfaceLayer();

        const map = viewer.getTop();

        map.addEventListener("click", (event) => {
            context.input.onMouseClick(event);
        });

        root.appendChild(interfaceLayer);
        root.appendChild(modalLayer);

        context.modal.show(InitialDialog());
    }
}