import {JSXElement} from "solid-js";
import styles from "./Group.module.scss";

type Props = {
    entityId: string;
    children?: JSXElement | JSXElement[];
};

export function Group(props: Props): JSXElement {
    return <div class={styles.Group}>{props.children}</div>;
}