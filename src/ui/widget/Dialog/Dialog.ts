import styles from "./Dialog.module.scss";
import SaltireIconSvg from "@public/icon/saltire.svg";

import {Button} from "@ui/widget";

type Props = {
    children?: Element[];
    id?: string;
    class?: string;
    title?: string;
};

export function Dialog(props: Props): HTMLDivElement {
    const dialog = document.createElement("div");
    dialog.classList.add(styles.Dialog);

    if (props.id) dialog.id = props.id;
    if (props.class) dialog.classList.add(props.class);

    const closeButton = Button({
        class: styles.CloseButton,
        icon: SaltireIconSvg,
        onClick: () => dialog.remove(),
    });

    const head = document.createElement("div");
    head.classList.add(styles.Head);

    const dialogTitle = document.createElement("h1");
    dialogTitle.classList.add(styles.DialogTitle);
    dialogTitle.innerText = props.title ?? "";

    const body = document.createElement("div");
    body.classList.add(styles.Body);

    dialog.appendChild(head);
    head.appendChild(dialogTitle);
    head.appendChild(closeButton);

    dialog.appendChild(body);
    if (props.children) {
        props.children.forEach(child => body.appendChild(child));
    }

    return dialog;
}