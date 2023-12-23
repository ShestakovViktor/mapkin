/**
 * @param {{
 *     htmlFor: string;
 *     innerText: string;
 * }} props
 * @return {HTMLLabelElement}
 */
export function Label(props) {
    const label = document.createElement("label");
    label.htmlFor = props.htmlFor;
    label.innerText = props.innerText;

    return label;
}
