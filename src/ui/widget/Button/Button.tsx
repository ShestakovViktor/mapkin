import {Icon} from "@ui/widget";
import styles from "./Button.module.scss";
import {JSXElement, Show} from "solid-js";

type Props = {
    class?: string;
    label?: string;
    tooltip?: string;
    icon?: string;
    onClick?: (event?: MouseEvent) => void;
};

export function Button(props: Props): JSXElement {
    return (
        <button
            class={`${styles.Button} ${props.class ?? ""}`}
            title={props.tooltip}
            onClick={props.onClick}
        >
            <Show when={props.icon}>
                <Icon class={styles.Icon} svg={props.icon!}/>
            </Show>

            <Show when={props.label}>
                <label class={styles.Label}>{props.label}</label>
            </Show>
        </button>
    );
}