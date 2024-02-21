import {JSXElement} from "solid-js";
import styles from "./Column.module.scss";

type Props = {
    children?: JSXElement | JSXElement[];
    id?: string;
    class?: string;
};

export function Column(props: Props): JSXElement {
    return (
        <div class={`${styles.Column} ${props.class ?? ""}`}>
            {props.children}
        </div>
    );
}