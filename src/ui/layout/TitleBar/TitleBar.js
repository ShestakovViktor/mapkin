import styles from "./TitleBar.module.scss";


export function TitleBar() {
    const titleBar = document.createElement("div");
    titleBar.classList.add(styles.TitleBar);

    titleBar.innerText = "TitleBar";

    return titleBar;
}