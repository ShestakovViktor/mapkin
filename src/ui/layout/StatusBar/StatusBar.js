import styles from "./StatusBar.module.scss";


export function StatusBar() {
    const statusBar = document.createElement("div");
    statusBar.classList.add(styles.ToolBar);

    console.log(styles.StatusBar);


    return statusBar;
}