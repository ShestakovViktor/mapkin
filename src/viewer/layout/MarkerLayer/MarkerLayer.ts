import styles from "./MarkerLayer.module.scss";

export function MarkerLayer(): HTMLDivElement {
    const markers = document.createElement("div");
    markers.classList.add(styles.MarkerLayer);

    return markers;
}