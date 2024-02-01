import {Pivot} from "./Pivot";

const LMB = 1;

export class Mouse {

    constructor(private map: HTMLElement, private pivot: Pivot) {
        map.addEventListener("wheel", (event) => {
            const rect = map.getBoundingClientRect();
            const scale = pivot.getScale();

            const mouseX = (event.clientX - rect.x) / scale;
            const mouseY = (event.clientY - rect.y) / scale;
            const direction = event.deltaY < 0 ? 1 : -1;

            const zoomIntensity = 0.1;
            const scaleChange = direction * zoomIntensity;

            pivot.setScale(scale + scaleChange);
            pivot.setX(pivot.getX() - mouseX * scaleChange);
            pivot.setY(pivot.getY() - mouseY * scaleChange);
        });

        map.addEventListener("mousedown", () => {
            document.body.style.cursor = "grabbing";
        });

        map.addEventListener("mousemove", (event: MouseEvent) => {
            if (event.buttons == LMB) {
                pivot.setX(pivot.getX() + event.movementX);
                pivot.setY(pivot.getY() + event.movementY);
            }
        });

        map.addEventListener("mouseup", () => {
            document.body.style.cursor = "default";
        });
    }
}