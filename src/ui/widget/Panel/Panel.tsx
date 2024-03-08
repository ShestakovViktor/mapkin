import {JSXElement} from "solid-js";
import styles from "./Panel.module.scss";

type Props = {
    class?: string;
    children?: JSXElement | JSXElement[];
};

export function Panel(props: Props): JSXElement {
    return (
        <div class={`${styles.Panel} ${props.class ?? ""}`}>
            {props.children}
        </div>
    );
}