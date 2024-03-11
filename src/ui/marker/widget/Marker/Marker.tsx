import styles from "./Marker.module.scss";
import {JSXElement, Show, createSignal} from "solid-js";
import {Marker as Data} from "@src/type";
import {useViewerContext} from "@ui/viewer/context";

type Props = {
    entityId: string;
};

export function Marker(props: Props): JSXElement {
    const context = useViewerContext();
    const entity = context.project().getEntityById(props.entityId) as Data;
    const src = context.project().getSource(entity.sourceId);

    const [show, setShow] = createSignal(false);

    return (
        <div
            class={styles.Marker}
            style={{
                transform: `translate3d(
                    ${entity.x * context.mapCtx.scale + "px"}, 
                    ${entity.y * context.mapCtx.scale + "px"},
                    0
                )`,
            }}
        >
            <img
                class={styles.Mark}
                src={src}
                onclick={(event) => {
                    setShow(true);
                    event.stopPropagation();
                }}
            />

            <Show when={show()}>
                <div class={styles.Info}>
                    <p>{entity.text}</p>
                </div>
            </Show>
        </div>
    );
}