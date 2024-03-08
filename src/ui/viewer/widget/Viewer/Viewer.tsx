import {JSXElement, createEffect, createResource, on, onMount} from "solid-js";
import styles from "./Viewer.module.scss";

import {Node} from "@ui/viewer/widget";

import {useViewerContext} from "@ui/viewer/context";
import {Node as NodeData} from "@type";
import {Viewport} from "@ui/viewer/utility";

const LMB = 1;

function pinchOut(el: HTMLElement, startX = 0, startY = 0): void {
    const f1 = new Touch({
        identifier: 1,
        target: el,
        clientX: startX,
        clientY: startY,
    });
    const f2 = new Touch({
        identifier: 2,
        target: el,
        clientX: startX,
        clientY: startY,
    });

    const pinchStart = new TouchEvent("touchstart", {touches: [f1, f2]});
    el.dispatchEvent(pinchStart);

    let delta = 0;
    const interval = setInterval(() => {
        if (delta > 5) clearInterval(interval);

        const f1 = new Touch({
            identifier: 1,
            target: el,
            clientX: startX + delta,
            clientY: startY,
        });

        const f2 = new Touch({
            identifier: 2,
            target: el,
            clientX: startX - delta,
            clientY: startY,
        });

        const pinchMove = new TouchEvent("touchmove", {touches: [f1, f2]});
        el.dispatchEvent(pinchMove);

        delta++;
    }, 100);
}

export function Viewer(): JSXElement {
    const context = useViewerContext();

    let rootEl: HTMLDivElement;

    const [root, {refetch}] = createResource<NodeData>(() => {
        const size = context.project().getData().size;
        context.setBrect(size);

        return context.project().getRoot();
    });

    context.project().onRender(() => {
        void refetch();
    });

    createEffect(on(root, () => {
        const root = document.querySelector("#root") as HTMLElement;
        root.classList.add(styles.Viewer);
        // new Pivot(root, context.setPivot);
    }));

    onMount(() => {
        const rootBrect = rootEl.getBoundingClientRect();
        const viewport = new Viewport(
            {
                x: 0,
                y: 0,
                width: rootBrect.width,
                height: rootBrect.height,
                scale: 1,
            },
            context.brect,
            context.setBrect
        );

        rootEl.addEventListener("click", (e) => {
            if (e.buttons == 1) {
                pinchOut(rootEl, e.x, e.y);
            }
        });
        rootEl.addEventListener("mousedown", (e) => viewport.onMouseDown(e));
        rootEl.addEventListener("mousemove", (e) => viewport.onMouseMove(e));
        rootEl.addEventListener("mouseup", () => viewport.onMouseUp());
        rootEl.addEventListener("mouseleave", () => viewport.onMouseLeave());
        rootEl.addEventListener("wheel", (e) => viewport.onMouseWheel(e));
        rootEl.addEventListener("touchstart", (e) => viewport.onTouchStart(e));
        rootEl.addEventListener("touchmove", (e) => viewport.onTouchMove(e));
        rootEl.addEventListener("touchend", () => viewport.onTouchEnd());
    });

    return (
        <>
            <Node data={root() as unknown as NodeData} ref={rootEl!}/>
        </>
    );
}