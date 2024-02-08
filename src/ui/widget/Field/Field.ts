import styles from "./Field.module.scss";

type Props = {
    children?: Element[];
    id?: string;
    class?: string;
    type?: "row" | "column";
};

export function Field(props: Props): HTMLDivElement {
    const field = document.createElement("div");
    field.classList.add(styles.Field, styles[props.type ?? "row"]);

    if (props.children) {
        props.children.forEach(child => field.appendChild(child));
    }

    return field;
}