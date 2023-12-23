import styles from "./Dialog.module.scss";


/**
 * @param {{
 *     children?: Element[];
 *     id?: string;
 *     class?: string;
 * }} props
 * @return {HTMLDivElement}
 */
export function Dialog(props) {
    const dialog = document.createElement("div");
    dialog.classList.add(styles.Dialog);

    if (props.id) dialog.id = props.id;
    if (props.class) dialog.classList.add(props.class);
    if (props.children) {
        props.children.forEach(child => dialog.appendChild(child));
    }

    return dialog;
}