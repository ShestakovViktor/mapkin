import {useViewerContext} from "@ui/viewer/context";
import styles from "./MarkerInfoSection.module.scss";
import {JSXElement} from "solid-js";
import {Marker as Data} from "@type";

type Props = {
    entityId: string;
};

export function MarkerInfoSection(props: Props): JSXElement {
    const context = useViewerContext();
    const entity = context.project().getEntity(props.entityId) as Data;
    const src = context.project().getSource(entity.sourceId);

    return (
        <div
            class={styles.MarkerInfoSection}
            style={{
                transform: `translate3d(${entity.x + "px"}, ${entity.y + "px"}, 0)`,
            }}
        >
            <p>{entity.text}</p>
        </div>
    );
}