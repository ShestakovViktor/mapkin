import styles from "./Marker.module.scss";

/**
 * @param {{
 *     x: number;
 *     y: number;
 *     text: string;
 *     src: string;
 * }} props
 */
export function Marker(props) {
    const marker = document.createElement("img");
    marker.classList.add(styles.Marker);

    marker.src = props.src;

    marker.style.width = "64px";
    marker.style.height = "64px";
    marker.style.left = `${props.x}px`;
    marker.style.top = `${props.y}px`;

    return marker;
}