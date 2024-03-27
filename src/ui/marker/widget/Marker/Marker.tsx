import styles from "./Marker.module.scss";
import {JSXElement, Show, createSignal} from "solid-js";
import {Marker as Data} from "@src/type";
import {useViewerContext} from "@ui/viewer/context";

type Props = {
    entityId: string;
};

export function Marker(props: Props): JSXElement {
    const viewerCtx = useViewerContext();
    const entity = viewerCtx.project().getEntityById(props.entityId) as Data;
    const src = viewerCtx.project().getSource(entity.sourceId);

    const [show, setShow] = createSignal(false);

    let info: HTMLDivElement;

    return (
        <div
            class={styles.Marker}
            style={{
                transform: `translate3d(
                    ${entity.x * viewerCtx.mapCtx.scale + "px"}, 
                    ${entity.y * viewerCtx.mapCtx.scale + "px"},
                    0
                )`,
            }}
        >
            <img
                class={styles.Mark}
                src={src}
                onclick={(event) => {
                    setShow(true);

                    window.addEventListener("pointerdown", (event) => {
                        if (!info.contains(event.target as HTMLElement)) {
                            setShow(false);
                        }
                    });

                    event.stopPropagation();
                }}
            />

            <Show when={show()}>
                <div class={styles.Info} ref={info!}>
                    <p class={styles.Text}>{entity.text}</p>
                    <Show when={entity.graphicIds.length}>
                        <img
                            class={styles.Graphic}
                            src={
                                viewerCtx.project()
                                    .getSource(entity.graphicIds[0])
                            }
                        />
                    </Show>
                </div>
            </Show>
        </div>
    );
}