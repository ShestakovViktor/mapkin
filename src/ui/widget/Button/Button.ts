import styles from "./Button.module.scss";


type Props = {
    class?: string;
    label?: string;
    tooltip?: string;
    icon?: SVGElement;
    onClick?: () => void;
}
export function Button(props: Props): HTMLButtonElement {
    const button = document.createElement("button");
    button.classList.add(styles.Button);

    if (props.tooltip) button.title = props.tooltip;

    if (props.class) button.classList.add(props.class);

    if (props.onClick) {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            if (props.onClick) props.onClick();
        });
    }

    if (props.icon) button.appendChild(props.icon);

    if (props.label) button.innerText = props.label;

    return button;
}