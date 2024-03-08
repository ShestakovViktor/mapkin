import {Brect} from "@type";
import {SetStoreFunction} from "solid-js/store";

const LMB = 1;

export class Viewport {
    private mouseEvent?: MouseEvent;

    private touchEvent?: TouchEvent;

    constructor(
        private rootBrect: Brect,
        private mapBrect: Brect,
        private setBrect: SetStoreFunction<Brect>
    ) {}

    onMouseClick(event: MouseEvent): void {
        //this.pinchOut(, event.x, event.y);
    }

    onMouseDown(event: MouseEvent): void {
        this.mouseEvent = event;
    }

    onMouseMove(event: MouseEvent): void {
        if (!this.mouseEvent) return;

        if (event.buttons == LMB) {
            const shiftX = event.x - this.mouseEvent.x;
            const shiftY = event.y - this.mouseEvent.y;
            this.move(shiftX, shiftY);
        }

        this.mouseEvent = event;
    }

    onMouseWheel(event: WheelEvent): void {
        this.zoom(-Math.sign(event.deltaY), event.x, event.y);
    }

    onMouseUp(): void {this.correct();}

    onMouseLeave(): void {this.correct();}

    onTouchStart(event: TouchEvent): void {
        this.touchEvent = event;
    }

    onTouchMove(touchEvent: TouchEvent): void {
        if (!this.touchEvent) return;

        if (touchEvent.touches.length == 1) {
            const {clientX: x1, clientY: y1} = this.touchEvent.touches[0];
            const {clientX: x2, clientY: y2} = touchEvent.touches[0];

            const [deltaX, deltaY] = this.getDifference(x1, y1, x2, y2);
            this.move(deltaX, deltaY);
        }
        else {
            const {clientX: x1, clientY: y1} = this.touchEvent.touches[0];
            const {clientX: x2, clientY: y2} = this.touchEvent.touches[1];
            const {clientX: x3, clientY: y3} = touchEvent.touches[0];
            const {clientX: x4, clientY: y4} = touchEvent.touches[1];

            const [midX, midY] = this.getMiddle(x3, y3, x4, y4);
            const [oldDeltaX] = this.getDelta(x1, y1, x2, y2);
            const [newDeltaX] = this.getDelta(x3, y3, x4, y4);

            const value = newDeltaX > oldDeltaX ? 1 : -1;

            this.zoom(value, midX, midY);
        }

        touchEvent.preventDefault();

        this.touchEvent = touchEvent;
    }

    onTouchEnd(): void {
        this.correct();
    }

    zoom(direction: number, clientX: number, clientY: number): void {
        const intensity = 0.1;
        let deltaScale = Math.exp(direction * intensity);
        let newScale = this.mapBrect.scale * deltaScale;

        if (this.mapBrect.height * newScale < this.rootBrect.height) {
            newScale = this.rootBrect.height / this.mapBrect.height;
            deltaScale = newScale / this.mapBrect.scale;
        }
        else if (this.mapBrect.width * newScale < this.rootBrect.width) {
            newScale = this.rootBrect.width / this.mapBrect.width;
            deltaScale = newScale / this.mapBrect.scale;
        }

        const mouseX = clientX - this.rootBrect.x - this.mapBrect.x;
        const mouseY = clientY - this.rootBrect.y - this.mapBrect.y;

        this.setBrect({
            x: this.mapBrect.x - mouseX * (deltaScale - 1),
            y: this.mapBrect.y - mouseY * (deltaScale - 1),
            scale: newScale,
        });

        this.correct();
    }

    move(shiftX: number, shiftY: number): void {
        let newX = this.mapBrect.x + shiftX;
        let newY = this.mapBrect.y + shiftY;

        const mapRight = this.mapBrect.x + this.mapBrect.width * this.mapBrect.scale;
        const mapBottom = this.mapBrect.y + this.mapBrect.height * this.mapBrect.scale;

        if (this.mapBrect.x > 0) {
            newX = this.mapBrect.x + shiftX / (this.mapBrect.x * .5);
        }
        else if (mapRight < this.rootBrect.width) {
            newX = this.mapBrect.x + shiftX / (this.rootBrect.width - mapRight);
        }

        if (this.mapBrect.y > 0) {
            newY = this.mapBrect.y + shiftY / (this.mapBrect.y * .5);
        }
        else if (mapBottom < this.rootBrect.height) {
            newY = this.mapBrect.y + shiftY / (this.rootBrect.height - mapBottom);
        }

        this.setBrect({x: newX, y: newY});
    }

    correct(): void {
        if (this.mapBrect.x > 0) this.setBrect({x: 0});
        else if (
            this.mapBrect.x + this.mapBrect.width * this.mapBrect.scale
                < this.rootBrect.width
        ) {
            this.setBrect({
                x: this.rootBrect.width
                    - this.mapBrect.width * this.mapBrect.scale,
            });
        }

        if (this.mapBrect.y > 0) this.setBrect({y: 0});
        else if (
            this.mapBrect.y + this.mapBrect.height * this.mapBrect.scale
                < this.rootBrect.height
        ) {
            this.setBrect({
                y: this.rootBrect.height
                    - this.mapBrect.height * this.mapBrect.scale,
            });
        }
    }

    private getDifference(
        x1: number, y1: number, x2: number, y2: number
    ): [number, number] {
        return [(x2 - x1), (y2 - y1)];
    }

    private getMiddle(
        x1: number, y1: number, x2: number, y2: number
    ): [number, number] {
        return [(x1 + x2) / 2, (y1 + y2) / 2];
    }

    private getDelta(
        x1: number, y1: number, x2: number, y2: number
    ): [number, number] {
        return [Math.abs(x2 - x1), Math.abs(y2 - y1)];
    }

}

