import styles from "./Input.module.scss";

type Props = {
    type: "text" | "file" | "submit";
    id?: string;
    name?: string;
    value?: string;
    accept?: string;
}
export function Input(props: Props): HTMLInputElement {
    const input = document.createElement("input");
    input.type = props.type;

    input.classList.add(styles.Input);

    if (props.id) input.id = props.id;
    if (props.name) input.name = props.name;
    if (props.value) input.value = props.value;

    if (props.accept) input.accept = props.accept;

    return input;
}
