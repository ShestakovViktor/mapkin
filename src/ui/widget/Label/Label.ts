type Props = {
    htmlFor: string;
    innerText: string;
}
export function Label(props: Props): HTMLLabelElement {
    const label = document.createElement("label");
    label.htmlFor = props.htmlFor;
    label.innerText = props.innerText;

    return label;
}
