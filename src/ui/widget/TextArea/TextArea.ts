import styles from "./TextArea.module.scss";

type Props = {
    id?: string;
    name?: string;
    value?: string;
}
export function TextArea(props: Props): HTMLTextAreaElement {
    const textarea = document.createElement("textarea");
    textarea.classList.add(styles.TextArea);

    if (props.id) textarea.id = props.id;
    if (props.name) textarea.name = props.name;
    if (props.value) textarea.value = props.value;

    return textarea;
}
