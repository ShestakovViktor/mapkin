import styles from "./TileLayer.module.scss";

export function TileLayer(): HTMLDivElement {
    const markers = document.createElement("div");
    markers.classList.add(styles.TileLayer);

    return markers;
}