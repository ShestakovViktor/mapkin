import styles from "./Tile.module.scss";
import {JSXElement} from "solid-js";
import {Tile as TileData} from "@src/type";
import {useViewerContext} from "@ui/viewer/context";

type Props = {
    entityId: string;
};

export function Tile(props: Props): JSXElement {
    const context = useViewerContext();
    const entity = context.project().getEntityById(props.entityId) as TileData;
    const src = context.project().getSource(entity.sourceId);

    return (
        <img
            class={styles.Tile}
            src={src}
            draggable={false}
            style={{
                left: String(entity.x) + "px",
                top: String(entity.y) + "px",
                width: String(entity.width) + "px",
                height: String(entity.height) + "px",
            }}
        />
    );
}