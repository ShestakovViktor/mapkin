import styles from "./UILayer.module.scss";

/**
 *
 * @param {import("@ui/type").Context} context
 * @returns
 */
export function UILayer(context) {
    const uiLayer = document.createElement("div");
    uiLayer.id = "ui";
    uiLayer.classList.add(styles.UILayer);

    console.log(context);

    return uiLayer;
}