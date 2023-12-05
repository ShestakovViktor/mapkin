import "@ui/style/colors.scss";
import "@ui/style/global.scss";

import {ModalLayer} from "@ui/layout/ModalLayer";
import {InitialDialog} from "@ui/feature/project/component";


export class UI{
    /**
     * @param {HTMLElement} root
     * @param {import("@core").Core} core
     */
    constructor(root, core) {
        const modalLayer = ModalLayer();
        modalLayer.appendChild(InitialDialog(core));

        root.appendChild(modalLayer);
    }
}