import styles from "./Tile.module.scss";

type Props = {
    width: number;
    height: number;
    x: number;
    y: number;
    src: string;
}
export function Tile(props: Props): HTMLImageElement {
    const tile = document.createElement("img");
    tile.classList.add(styles.Tile);

    tile.src = props.src;

    tile.style.width = `${props.width}px`;
    tile.style.height = `${props.height}px`;
    tile.style.left = `${props.x}px`;
    tile.style.top = `${props.y}px`;

    return tile;
}