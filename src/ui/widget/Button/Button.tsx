import {Icon} from "@ui/widget";
import styles from "./Button.module.scss";
import {JSXElement, Show} from "solid-js";

type Props = {
    class?: string;
    label?: string;
    tooltip?: string;
    icon?: string;
    pressed?: boolean;
    onClick?: (event?: MouseEvent) => void;
};

export function Button(props: Props): JSXElement {
    return (
        <button
            classList={{
                [styles.Button]: true,
                [styles.Pressed]: props.pressed,
                [props.class ?? ""]: Boolean(props.class),
            }}
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