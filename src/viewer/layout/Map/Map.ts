import styles from "./Map.module.scss";
// import gsap from "gsap";
// import Draggable from "gsap/dist/Draggable";

// gsap.registerPlugin(Draggable);

type Props = {
    children?: Element[];
};

export function Map(props: Props): HTMLDivElement {
    const map = document.createElement("div");
    map.classList.add(styles.Map);
    map.id = "map";
    map.draggable = false;
    map.style.userSelect = "none";

    if (props.children) {
        props.children.forEach(child => map.appendChild(child));
    }

    return map;
}