import styles from "./Dialog.module.scss";
import SaltireIconSvg from "@public/icon/saltire.svg";

import {Button, Icon} from "@ui/widget";

type Props = {
    children?: Element[];
    id?: string;
    class?: string;
};

export function Dialog(props: Props): HTMLDivElement {
    const dialog = document.createElement("div");
    dialog.classList.add(styles.Dialog);

    const closeButton = Button({
        class: styles.CloseButton,
        type: "DialogButton",
        icon: Icon(SaltireIconSvg),
        onClick: () => {dialog.remove();},
    });

    dialog.onclick = (event): void => {event.stopPropagation();};

    dialog.appendChild(closeButton);

    if (props.id) dialog.id = props.id;
    if (props.class) dialog.classList.add(props.class);
    if (props.children) {
        props.children.forEach(child => dialog.appendChild(child));
    }

    return dialog;
}