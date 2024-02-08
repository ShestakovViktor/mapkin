import styles from "./Row.module.scss";

type Props = {
    children?: Element[];
    id?: string;
    class?: string;
};

export function Row(props: Props): HTMLDivElement {
    const row = document.createElement("div");
    row.classList.add(styles.Row);

    if (props.children) {
        props.children.forEach(child => row.appendChild(child));
    }

    return row;
}