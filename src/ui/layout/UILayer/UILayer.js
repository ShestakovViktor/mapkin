import styles from "./UILayer.module.scss";

export function UILayer() {
    const uiLayer = document.createElement("div");
    uiLayer.id = "ui";
    uiLayer.classList.add(styles.UILayer);

    return uiLayer;
}