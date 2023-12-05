import "@ui/style/colors.scss";
import "@ui/style/global.scss";

import {ModalLayer} from "@ui/layout/ModalLayer";
import {InitialDialog} from "@ui/feature/project/component";


/**
 * @param {import("@src/app").Context} context
 */
export function initUI(context) {
    const root = document.body;



    const modalLayer = ModalLayer();
    modalLayer.appendChild(InitialDialog(context));

    root.appendChild(modalLayer);
}