import {InterfaceLayer, ModalLayer} from "@ui/layout/";
import {InitialDialog} from "@ui/feature/project/component";
import {Input, Modal} from "@ui";
import {Context, createContext} from "@ui/context";
import {Core} from "@core";
import {Viewer} from "@viewer";
import {AssetSelectDialog} from "./feature/asset/component";

export class UI {
    context: Context;

    constructor(root: HTMLElement, viewer: Viewer, core: Core) {
        const modalLayer = ModalLayer();

        const modal = new Modal(modalLayer);
        const input = new Input(viewer, core, modal);

        this.context = createContext({modal, input, viewer, core});

        const interfaceLayer = InterfaceLayer();

        const map = viewer.getTop();

        map.addEventListener("click", (event) => {
            this.context.input.onMouseClick(event);
        });

        root.appendChild(interfaceLayer);
        root.appendChild(modalLayer);
    }

    showInitialDialog(): void {
        this.context.modal.show(InitialDialog());
    }
}