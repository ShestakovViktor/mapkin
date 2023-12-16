import styles from "./Tile.module.scss";

/**
 * @param {{
 *     width: number;
 *     height: number;
 *     x: number;
 *     y: number;
 *     src: string;
 * }} props
 */
export function Tile(props) {
    const tile = document.createElement("img");
    tile.classList.add(styles.Tile);

    tile.src = props.src;

    tile.style.width = `${props.width}px`;
    tile.style.height = `${props.height}px`;
    tile.style.left = `${props.x}px`;
    tile.style.top = `${props.y}px`;

    return tile;
}