//import styles from "./Icon.module.scss";


/**
 * @param {string} svg
 * @return {SVGElement}
 */
export function Icon(svg) {
    const template = document.createElement("template");
    template.innerHTML = svg;
    console.log(template.content.children[0]);
    const icon = /** @type {SVGElement} */(template.content.children[0]);

    return icon;
}