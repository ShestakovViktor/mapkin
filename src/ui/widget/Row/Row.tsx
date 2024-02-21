import {JSXElement} from "solid-js";
import styles from "./Row.module.scss";

type Props = {
    children?: JSXElement[];
    id?: string;
    class?: string;
};

export function Row(props: Props): JSXElement {
    return (
        <div class={styles.Row}>{props.children}</div>
    );
}