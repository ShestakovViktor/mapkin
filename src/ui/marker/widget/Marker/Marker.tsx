import styles from "./Marker.module.scss";
import {JSXElement} from "solid-js";
import {Marker as Data} from "@src/type";
import {useViewerContext} from "@ui/context";

type Props = {
    entityId: string;
};

export function Marker(props: Props): JSXElement {
    const context = useViewerContext();
    const entity = context.project.getEntity(props.entityId) as Data;
    const src = context.project.getSource(entity.sourceId);

    return (
        <img
            class={styles.Marker}
            src={src}
            style={{
                left: String(entity.x) + "px",
                top: String(entity.y) + "px",
                width: "32px",
                height: "32px",
            }}
        />
    );
}