import {JSXElement} from "solid-js";
import styles from "./Form.module.scss";

type Props = {
    children?: JSXElement | JSXElement[];
    id?: string;
    class?: string;
    onSubmit?: (event: SubmitEvent) => void;
};

export function Form(props: Props): JSXElement {
    return (
        <form
            class={`${styles.Form} ${props.class ?? ""}`}
            onSubmit={props.onSubmit}
        >
            {props.children}
        </form>
    );
}