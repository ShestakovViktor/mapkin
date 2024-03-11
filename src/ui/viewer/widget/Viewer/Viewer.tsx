import {JSXElement, createEffect, createRenderEffect, createSignal, on, onMount} from "solid-js";

import {Entity} from "@ui/viewer/widget";

import {useViewerContext} from "@ui/viewer/context";
import {Viewport} from "@ui/viewer/utility";

export function Viewer(): JSXElement {
    const viewerCtx = useViewerContext();

    const [rootId, setRootId] = createSignal("", {equals: false});

    createEffect(on(viewerCtx.project, () => {
        const size = viewerCtx.project().getData().size;

        viewerCtx.setMapCtx({
            x: 0,
            y: 0,
            width: size.width,
            height: size.height,
            scale: 1,
        });
    }));

    createEffect(on(viewerCtx.render, () => {
        setRootId(viewerCtx.project().getRootId());
    }));

    createEffect(() => {
        const rootBCR = viewerCtx.root()?.getBoundingClientRect();
        if (!rootBCR) return;

        viewerCtx.setRootCtx({
            width: rootBCR.width,
            height: rootBCR.height,
        });
    });

    function setupRoot(el: HTMLElement): void {
        const viewport = new Viewport();

        el.addEventListener("mousedown", (e) => viewport.onMouseDown(e));
        el.addEventListener("mousemove", (e) => viewport.onMouseMove(e));
        el.addEventListener("mouseup", () => viewport.onMouseUp());
        el.addEventListener("mouseleave", () => viewport.onMouseLeave());
        el.addEventListener("wheel", (e) => viewport.onMouseWheel(e));
        el.addEventListener("touchstart", (e) => viewport.onTouchStart(e));
        el.addEventListener("touchmove", (e) => viewport.onTouchMove(e));
        el.addEventListener("touchend", () => viewport.onTouchEnd());

        viewerCtx.setRoot(el);
    }

    return (<Entity entityId={rootId()} ref={setupRoot} />);
}