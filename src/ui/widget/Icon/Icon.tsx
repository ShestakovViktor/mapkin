import {JSXElement} from "solid-js";
import styles from "./Icon.module.scss";

type Props = {
    class?: string;
    svg: string;
};

export function Icon(props: Props): JSXElement {
    const template = document.createElement("template");
    if (props.svg) template.innerHTML = props.svg;
    const icon = template.content.children[0] as SVGElement;
    icon.classList.add(styles.Icon);
    if (props.class) icon.classList.add(props.class);

    return icon;
    // (
    //     <svg class={`${styles.Icon} ${props.class ?? ""}`}>
    //         {props.svg}
    //     </svg>
    // );
}