import {JSXElement, createEffect, createResource, createSignal, onMount} from "solid-js";
import styles from "./Map.module.scss";

import {Node} from "@src/ui/map/widget";

import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import {useViewerContext} from "@src/ui/context";
import {Data, Node as NodeData} from "@type";
gsap.registerPlugin(Draggable);

export function Map(): JSXElement {
    const context = useViewerContext();

    let el: HTMLDivElement | undefined;

    const [root, {mutate, refetch}] = createResource<NodeData>(() => {
        return context.project.getRoot();
    });

    context.project.onRender(() => {void refetch();});

    const foo = context.project.getData();

    createEffect(() => {
        console.log(root());
    });

    onMount(() => {
        if (el) {
            Draggable.create(el, {
                type: "x,y",
                allowContextMenu: true,
                zIndexBoost: false,
                // onDrag() {
                //     pivot.setX(this.x);
                //     pivot.setY(this.y);
                // },
            });
        }
    });

    return (
        <div
            id="map"
            class={styles.Map}
            draggable="false"
            ref={el}
            style={{
                width : foo.size.width + "px",
                height : foo.size.height + "px",
            }}
        >
            <Node data={root() as unknown as NodeData}/>
        </div>
    );
}

// private setupTicker(): void {
//     const setScaleX = gsap.quickSetter(this.map, "scaleX");
//     const setScaleY = gsap.quickSetter(this.map, "scaleY");

//     const setPositionX = gsap.quickSetter(this.map, "x", "px");
//     const setPositionY = gsap.quickSetter(this.map, "y", "px");

//     gsap.ticker.add(() => {
//         const x = this.pivot.getX();
//         setPositionX(x);

//         const y = this.pivot.getY();
//         setPositionY(y);

//         const scale = this.pivot.getScale();
//         setScaleX(scale);
//         setScaleY(scale);
//     });
// }