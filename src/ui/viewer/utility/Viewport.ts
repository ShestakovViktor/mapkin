import {useViewerContext} from "@ui/viewer/context";

const LMB = 1;

export class Viewport {
    private mouseEvent?: MouseEvent;

    private touchEvent?: TouchEvent;

    private viewerCtx = useViewerContext();

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
        const direction = -Math.sign(event.deltaY);
        const intensity = 0.1;
        const delta = Math.exp(direction * intensity);

        this.zoom(delta, event.x, event.y);
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

            const direction = newDeltaX > oldDeltaX ? 1 : -1;
            const intensity = 0.02;
            const delta = Math.exp(direction * intensity);

            this.zoom(delta, midX, midY);
        }

        touchEvent.preventDefault();

        this.touchEvent = touchEvent;
    }

    onTouchEnd(): void {
        this.touchEvent = undefined;
        this.correct();
    }

    zoom(delta: number, clientX: number, clientY: number): void {
        const {mapCtx, setMapCtx, rootCtx} = this.viewerCtx;
        let deltaScale = delta;

        let newScale = mapCtx.scale * deltaScale;

        if (mapCtx.height * newScale < rootCtx.height) {
            newScale = rootCtx.height / mapCtx.height;
            deltaScale = newScale / mapCtx.scale;
        }
        else if (mapCtx.width * newScale < rootCtx.width) {
            newScale = rootCtx.width / mapCtx.width;
            deltaScale = newScale / mapCtx.scale;
        }

        const mouseX = clientX - rootCtx.x - mapCtx.x;
        const mouseY = clientY - rootCtx.y - mapCtx.y;

        setMapCtx({
            x: mapCtx.x - mouseX * (deltaScale - 1),
            y: mapCtx.y - mouseY * (deltaScale - 1),
            scale: newScale,
        });

        this.correct();
    }

    move(shiftX: number, shiftY: number): void {
        const {mapCtx, setMapCtx, rootCtx} = this.viewerCtx;

        let newX = mapCtx.x + shiftX;
        let newY = mapCtx.y + shiftY;

        const mapRight = mapCtx.x + mapCtx.width * mapCtx.scale;
        const mapBottom = mapCtx.y + mapCtx.height * mapCtx.scale;

        if (mapCtx.x > 0) {
            newX = mapCtx.x + shiftX / (mapCtx.x * .5);
        }
        else if (mapRight < rootCtx.width) {
            newX = mapCtx.x + shiftX / (rootCtx.width - mapRight);
        }

        if (mapCtx.y > 0) {
            newY = mapCtx.y + shiftY / (mapCtx.y * .5);
        }
        else if (mapBottom < rootCtx.height) {
            newY = mapCtx.y + shiftY / (rootCtx.height - mapBottom);
        }

        setMapCtx({x: newX, y: newY});
    }

    correct(): void {
        const {mapCtx, setMapCtx, rootCtx} = this.viewerCtx;

        if (mapCtx.x > 0) this.viewerCtx.setMapCtx({x: 0});
        else if (mapCtx.x + mapCtx.width * mapCtx.scale < rootCtx.width) {
            setMapCtx({x: rootCtx.width - mapCtx.width * mapCtx.scale});
        }

        if (mapCtx.y > 0) setMapCtx({y: 0});
        else if (mapCtx.y + mapCtx.height * mapCtx.scale < rootCtx.height) {
            setMapCtx({y: rootCtx.height - mapCtx.height * mapCtx.scale});
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

