import styles from "./Icon.module.scss";

export function Icon(svg: string): SVGElement {
    const template = document.createElement("template");
    template.innerHTML = svg;
    const icon = template.content.children[0] as SVGElement;
    icon.classList.add(styles.Icon);

    return icon;
}