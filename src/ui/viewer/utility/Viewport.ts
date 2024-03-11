import {useViewerContext} from "@ui/viewer/context";

const LMB = 1;

function throttleRAF(): (...args: any) => void {
    let queuedCallback: ((...args: any) => void) | undefined;

    return function (callback: (...args: any) => void): void {
        if (!queuedCallback) {
            requestAnimationFrame(() => {
                const cb = queuedCallback as ((...args: any) => void);
                queuedCallback = undefined;
                cb();
            });
        }
        queuedCallback = callback;
    };
}
const foo = throttleRAF();
const foo2 = throttleRAF();

export class Viewport {
    private events: {[key: string]: PointerEvent} = {};

    private viewerCtx = useViewerContext();

    onPointerDown(event: PointerEvent): void {
        this.events[event.pointerId] = event;
    }

    onPointerMove(event: PointerEvent): void {
        foo(() => {
            if (event.pointerType == "mouse" && event.buttons == LMB) {
                if (0 in this.events) {
                    const shiftX = event.clientX - this.events[0].clientX;
                    const shiftY = event.clientY - this.events[0].clientY;

                    this.move(shiftX, shiftY);
                }
            }
            else if (event.pointerType == "touch") {
                if (0 in this.events && 1 in this.events) {

                    const staticId = event.pointerId == 1 ? 0 : 1;
                    const basic = this.events[staticId];
                    const oldEvent = this.events[event.pointerId];
                    const newEvent = event;

                    if (oldEvent.x == newEvent.x || oldEvent.y == newEvent.y) {
                        return;
                    }

                    const x1 = oldEvent.x - basic.x;
                    const y1 = oldEvent.y - basic.y;

                    const x2 = newEvent.x - basic.x;
                    const y2 = newEvent.y - basic.y;

                    const oldLength = Math.sqrt(x1 * x1 + y1 * y1);
                    const newLength = Math.sqrt(x2 * x2 + y2 * y2);

                    const middleX = (basic.x + newEvent.x) / 2;
                    const middleY = (basic.y + newEvent.y) / 2;

                    if (newLength > oldLength) {
                        this.zoom(Math.exp(0.02), middleX, middleY);
                    }
                    else if (newLength < oldLength) {
                        this.zoom(Math.exp(-0.02), middleX, middleY);
                    }
                }
                else if (0 in this.events){
                    const shiftX = event.clientX - this.events[0].clientX;
                    const shiftY = event.clientY - this.events[0].clientY;

                    this.move(shiftX, shiftY);
                }
            }

            this.events[event.pointerId] = event;
        });
    }

    onPointerUp(event: PointerEvent): void {
        this.events = {};
        this.correct();
    }

    onPointerLeave(event: PointerEvent): void {
        this.events = {};
        this.correct();
    }

    onPointerCancel(event: PointerEvent): void {
        console.log("cancel");
    }

    onWheel(event: WheelEvent): void {
        event.preventDefault();

        foo2(() => {
            const direction = -Math.sign(event.deltaY);
            const intensity = 0.1;
            const delta = Math.exp(direction * intensity);

            this.zoom(delta, event.x, event.y);
        });
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

