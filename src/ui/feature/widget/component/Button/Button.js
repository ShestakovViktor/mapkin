import styles from "./Button.module.scss";


/**
 * @param {Object} params
 * @param {string} [params.class]
 * @param {string} [params.label]
 * @param {SVGElement} [params.icon]
 * @param {() => void} [params.onClick]
 * @return {HTMLButtonElement}
 */
export function Button(params) {
    const button = document.createElement("button");
    button.classList.add(styles.Button);
    if (params.class) button.classList.add(params.class);
    if (params.onClick) button.addEventListener("click", params.onClick);

    if (params.icon) {
        button.appendChild(params.icon);
    }

    return button;
}