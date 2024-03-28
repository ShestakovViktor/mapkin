import styles from "./Tile.module.scss";
import {JSXElement} from "solid-js";
import {Tile as TileData} from "@src/type";
import {useViewerContext} from "@ui/viewer/context";

type Props = {
    entityId: string;
};

export function Tile(props: Props): JSXElement {
    const context = useViewerContext();
    const entity = context.store.entity
        .getById(props.entityId) as TileData;
    const src = context.store.source
        .get(entity.sourceId);

    return (
        <img
            class={styles.Tile}
            src={src}
            draggable={false}
            style={{
                transform: `translate3d(${entity.x + "px"}, ${entity.y + "px"}, 0)`,
                // width: String(entity.width) + "px",
                // height: String(entity.height) + "px",
            }}
        />
    );
}