import styles from "./Panel.module.scss";

type Props = {
    class?: string;
    children?: HTMLElement[];
};

export function Panel(props: Props): HTMLDivElement {
    const panel = document.createElement("div");
    panel.classList.add(styles.Panel);

    if (props.class) panel.classList.add(props.class);

    if (props.children) {
        props.children.forEach(child => {
            child.classList.add(styles.PanelButton);
            panel.appendChild(child);
        });
    }

    return panel;
}