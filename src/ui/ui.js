import "@ui/style/global.scss";

import {ModalLayer} from "@ui/layout/ModalLayer";
import {InitialDialog} from "@ui/feature/project/component";


export function initUI() {
    const root = document.body;

    const modalLayer = ModalLayer();
    modalLayer.appendChild(InitialDialog());

    root.appendChild(modalLayer);
}