import styles from "./Viewer.module.scss";
import {JSXElement, createEffect, createSignal, on, onMount} from "solid-js";

import {Entity} from "@ui/viewer/widget";

import {useViewerContext} from "@ui/viewer/context";
import {Viewport} from "@ui/viewer/utility";

export const VIEWER_ID = "viewer";

export function Viewer(): JSXElement {
    const viewerCtx = useViewerContext();
    let viewerEl: HTMLDivElement;

    const [rootId, setRootId] = createSignal("", {equals: false});

    createEffect(on(viewerCtx.init, () => {
        const size = viewerCtx.store.getData().size;

        viewerCtx.setMapCtx({
            x: 0,
            y: 0,
            width: size.width,
            height: size.height,
            scale: 1,
        });
    }));

    createEffect(on(viewerCtx.render, () => {
        const rootId = viewerCtx.store.entity
            .getByParams({name:"root"});
        if (!rootId) throw new Error();
        setRootId(rootId);
    }));

    onMount((): void => {
        const viewport = new Viewport(viewerEl);
        viewerEl.addEventListener(
            "pointerdown",
            (e) => viewport.onPointerDown(e)
        );
        viewerEl.addEventListener(
            "pointermove",
            (e) => viewport.onPointerMove(e)
        );
        viewerEl.addEventListener(
            "pointerup",
            (e) => viewport.onPointerUp(e)
        );
        viewerEl.addEventListener(
            "pointerleave",
            (e) => viewport.onPointerLeave(e)
        );
        viewerEl.addEventListener(
            "pointercancel",
            (e) => viewport.onPointerCancel()
        );
        viewerEl.addEventListener(
            "wheel",
            (e) => viewport.onWheel(e)
        );
    });

    return (
        <div id={VIEWER_ID} class={styles.Viewer} ref={viewerEl!}>
            <Entity entityId={rootId()} ref={(el) => viewerCtx.setRoot(el)} />
        </div>
    );
}