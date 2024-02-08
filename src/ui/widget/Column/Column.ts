import styles from "./Column.module.scss";

type Props = {
    children?: Element[];
    id?: string;
    class?: string;
};

export function Column(props: Props): HTMLDivElement {
    const column = document.createElement("div");
    column.classList.add(styles.Column);

    if (props.children) {
        props.children.forEach(child => column.appendChild(child));
    }

    return column;
}