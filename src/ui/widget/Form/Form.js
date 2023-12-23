import styles from "./Form.module.scss";


/**
 * @param {{
 *     children?: Element[];
 *     id?: string;
 *     class?: string;
 *     submit?: (event: SubmitEvent) => void;
 * }} props
 * @return {HTMLFormElement}
 */
export function Form(props) {
    const form = document.createElement("form");
    form.classList.add(styles.Form);

    if (props.id) form.id = props.id;
    if (props.class) form.classList.add(props.class);
    if (props.submit) form.addEventListener("submit", props.submit);
    if (props.children) {
        props.children.forEach(child => form.appendChild(child));
    }

    return form;
}