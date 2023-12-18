import styles from "./Map.module.scss";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";

gsap.registerPlugin(Draggable);

export function Map() {
    const map = document.createElement("div");
    map.classList.add(styles.Map);
    map.id = "map";



    // let offset = 0;
    Draggable.create(map, {
        type: "x,y",
        allowContextMenu: true,
        zIndexBoost: false,

        // //onDragEnd: handleDragEnd,

        // onPress(this: Draggable) {
        //     offset = this.x;
        // },
        dragResistance: 0.5,
        bounds: document.querySelector("#root"),



        // liveSnap(value) {
        //     if (value > 0) {
        //         if (offset > 0) value += offset;
        //         return Math.atan(value)
        //             + value * .5;
        //     }
        //     else if (value < dif) {
        //         if (offset < dif) value += offset - dif;
        //         return Math.atan(value - dif)
        //             + (value - dif) * .5
        //             + dif;
        //     }
        //     else {
        //         return value;
        //     }
        // },

    });









    return map;
}