import styles from "./Map.module.scss";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";

gsap.registerPlugin(Draggable);


type Props = {
    children?: Element[];
}
export function Map(props: Props): HTMLDivElement {
    const map = document.createElement("div");
    map.classList.add(styles.Map);
    map.id = "map";

    if (props.children) {
        props.children.forEach(child => map.appendChild(child));
    }


    // let offset = 0;
    Draggable.create(map, {
        type: "x,y",
        allowContextMenu: true,
        zIndexBoost: false,
        dragResistance: 0.5,
        bounds: document.querySelector("#root"),
    });

    return map;
}