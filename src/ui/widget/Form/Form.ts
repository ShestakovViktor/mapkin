import styles from "./Form.module.scss";

type Props = {
    children?: Element[];
    id?: string;
    class?: string;
    onSubmit?: (event: SubmitEvent) => void;
};

export function Form(props: Props): HTMLFormElement {
    const form = document.createElement("form");
    form.classList.add(styles.Form);

    if (props.id) form.id = props.id;
    if (props.class) form.classList.add(props.class);
    if (props.children) {
        props.children.forEach(child => form.appendChild(child));
    }

    form.addEventListener("submit", (event) => {
        if (props.onSubmit) props.onSubmit(event);
    });

    return form;
}