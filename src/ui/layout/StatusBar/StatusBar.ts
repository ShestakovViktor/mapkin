import styles from "./StatusBar.module.scss";


export function StatusBar(): HTMLDivElement {
    const statusBar = document.createElement("div");
    statusBar.classList.add(styles.StatusBar);

    statusBar.innerText = "Status bar";

    return statusBar;
}