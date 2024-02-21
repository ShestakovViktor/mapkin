import styles from "./Dialog.module.scss";
import SaltireIconSvg from "@public/icon/saltire.svg";
import {Button} from "@ui/widget";

import {JSXElement} from "solid-js";

type Props = {
    children?: JSXElement | JSXElement[];
    id?: string;
    class?: string;
    title?: string;
    onClose?: () => void;
};

export function Dialog(props: Props): JSXElement {
    return (
        <div class={styles.Dialog}>
            <div class={styles.Head}>
                <h1 class={styles.DialogTitle}>
                    {props.title}
                </h1>
                <Button
                    class={styles.CloseButton}
                    icon={SaltireIconSvg}
                    onClick={props.onClose}
                />
            </div>
            <div class={styles.Body}>
                {props.children}
            </div>
        </div>
    );
}