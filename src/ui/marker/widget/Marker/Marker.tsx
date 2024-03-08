import styles from "./Marker.module.scss";
import {JSXElement} from "solid-js";
import {Marker as Data} from "@src/type";
import {useViewerContext} from "@ui/viewer/context";
import {Modal} from "@ui/widget/Modal";
import {MarkerInfoSection} from "@ui/marker/widget";

type Props = {
    entityId: string;
};

export function Marker(props: Props): JSXElement {
    const context = useViewerContext();
    const entity = context.project().getEntity(props.entityId) as Data;
    const src = context.project().getSource(entity.sourceId);

    const markerOverview = new Modal("#overlay");
    markerOverview.render(
        <MarkerInfoSection entityId={props.entityId}/>
    );

    return (
        <img
            class={styles.Marker}
            src={src}
            style={{
                transform: `translate3d(
                    ${String(entity.x * context.brect.scale) + "px"}, 
                    ${String(entity.y * context.brect.scale) + "px"},
                    0
                )`,
                width: "32px",
                height: "32px",
            }}
            onclick={() => {markerOverview.show();}}
        />
    );
}