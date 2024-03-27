import {useViewerContext} from "@ui/viewer/context";

const LMB = 1;

//LERP and animation loop with speed

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

type Vector = {x: number; y: number};

type PointerDownState = {
    map: Vector;
    centroid: Vector;
    perimeter: number;
};

export class Viewport {
    private viewerCtx = useViewerContext();

    private pointerDownState?: PointerDownState;

    private pointerMoveEvents: {[key: string]: PointerEvent} | never = {};

    private throttlePointerMove: (...args: any) => void;

    private throttleMouseWheel: (...args: any) => void;

    constructor(private viewer: HTMLElement) {
        this.throttlePointerMove = throttleRAF();
        this.throttleMouseWheel = throttleRAF();
    }

    onPointerDown(event: PointerEvent): void {
        this.pointerMoveEvents[event.pointerId] = event;

        const pointerMoveEvents = Object.values(this.pointerMoveEvents);
        this.pointerDownState = {
            map: {
                x: this.viewerCtx.mapCtx.x,
                y: this.viewerCtx.mapCtx.y,
            },
            centroid: this.getCentroid(pointerMoveEvents),
            perimeter: this.getPerimeter(pointerMoveEvents),
        };
    }

    onPointerMove(event: PointerEvent): void {
        if (event.pointerType == "mouse" && event.buttons != LMB) return;

        this.pointerMoveEvents[event.pointerId] = event;

        this.throttlePointerMove(() => {
            if (!this.pointerDownState) return;
            this.handlePinchGesture(this.pointerDownState);
            this.handleGrabGesture(this.pointerDownState);
        });
    }

    onPointerUp(event: PointerEvent): void {
        delete this.pointerMoveEvents[event.pointerId];

        if (Object.values(this.pointerMoveEvents).length == 0) {
            this.pointerDownState = undefined;
        }
        else if (this.pointerDownState) {
            const pointerEvents = Object.values(this.pointerMoveEvents);
            this.pointerDownState = {
                map: {
                    x: this.viewerCtx.mapCtx.x,
                    y: this.viewerCtx.mapCtx.y,
                },
                centroid: this.getCentroid(pointerEvents),
                perimeter: this.getPerimeter(pointerEvents),
            };
        }

        this.correct();
    }

    onPointerLeave(event: PointerEvent): void {
        delete this.pointerMoveEvents[event.pointerId];

        if (Object.values(this.pointerMoveEvents).length == 0) {
            this.pointerDownState = undefined;
        }
        else if (this.pointerDownState) {
            const pointerEvents = Object.values(this.pointerMoveEvents);
            this.pointerDownState = {
                map: {
                    x: this.viewerCtx.mapCtx.x,
                    y: this.viewerCtx.mapCtx.y,
                },
                centroid: this.getCentroid(pointerEvents),
                perimeter: this.getPerimeter(pointerEvents),
            };
        }

        this.correct();
    }

    onPointerCancel(): void {
        console.log("cancel");
    }

    onWheel(event: WheelEvent): void {
        event.preventDefault();

        this.throttleMouseWheel(() => {
            const direction = -Math.sign(event.deltaY);
            const intensity = 0.1;
            const delta = direction * intensity;

            this.zoom(delta, event.x, event.y);
        });
    }

    handleGrabGesture(pointerDownState: PointerDownState): void {
        const centroid = this.getCentroid(
            Object.values(this.pointerMoveEvents)
        );

        const shift = {
            x: centroid.x - pointerDownState.centroid.x,
            y: centroid.y - pointerDownState.centroid.y,
        };

        const viewer = this.viewer.getBoundingClientRect();
        const {mapCtx: map} = this.viewerCtx;

        const widthGap = -Math.abs(viewer.width - map.width * map.scale);
        const heightGap = -Math.abs(viewer.height - map.height * map.scale);

        const newMapX = this.foo(pointerDownState.map.x, shift.x, widthGap);
        const newMapY = this.foo(pointerDownState.map.y, shift.y, heightGap);

        this.move(Math.round(newMapX), Math.round(newMapY));
    }

    handlePinchGesture(pointerDownState: PointerDownState): void {
        if (!this.pointerDownState) return;

        const perimeter = this.getPerimeter(
            Object.values(this.pointerMoveEvents)
        );

        const delta = (this.pointerDownState.perimeter - perimeter) / -1000;
        const centroid = this.getCentroid(Object.values(this.pointerMoveEvents));

        if (delta) this.zoom(delta, centroid.x, centroid.y);

        this.pointerDownState.perimeter = perimeter;
    }

    getCentroid(events: PointerEvent[]): {x: number; y: number} {
        const centroid = {x: 0, y: 0};

        for (const event of events) {
            centroid.x += event.x;
            centroid.y += event.y;
        }

        centroid.x = centroid.x / events.length;
        centroid.y = centroid.y / events.length;

        return centroid;
    }

    getPerimeter(points: Vector[]): number {
        let res = 0;
        let prev = points[points.length - 1];
        for (const point of points) {
            res += Math.sqrt(
                Math.pow(point.x - prev.x, 2) + Math.pow(point.y - prev.y, 2)
            );
            prev = point;
        }
        return res;
    }

    zoom(delta: number, clientX: number, clientY: number): void {
        const viewCtx = this.viewer.getBoundingClientRect();
        const {mapCtx, setMapCtx} = this.viewerCtx;
        let deltaScale = Math.exp(delta);

        let newScale = mapCtx.scale * deltaScale;

        if (mapCtx.height * newScale < viewCtx.height) {
            newScale = viewCtx.height / mapCtx.height;
            deltaScale = newScale / mapCtx.scale;
        }
        else if (mapCtx.width * newScale < viewCtx.width) {
            newScale = viewCtx.width / mapCtx.width;
            deltaScale = newScale / mapCtx.scale;
        }

        const mouseX = clientX - viewCtx.x - mapCtx.x;
        const mouseY = clientY - viewCtx.y - mapCtx.y;

        if (this.pointerDownState) {
            this.pointerDownState.map = {
                x: this.pointerDownState.map.x - mouseX * (deltaScale - 1),
                y: this.pointerDownState.map.y - mouseY * (deltaScale - 1),
            };
        }

        setMapCtx({
            x: Math.round(mapCtx.x - mouseX * (deltaScale - 1)),
            y: Math.round(mapCtx.y - mouseY * (deltaScale - 1)),
            scale: newScale,
        });

        this.correct();
    }

    move(shiftX: number, shiftY: number): void {
        this.viewerCtx.setMapCtx({x: shiftX, y: shiftY});
    }

    foo(coord: number, shift: number, gap: number): number {
        const left = gap;
        const right = 0;

        let newCoord = coord;
        const realCoord = coord;
        const leftGap = realCoord - left;
        const shiftedLeftGap = leftGap + shift;
        const rightGap = realCoord - right;
        const shiftedRightGap = rightGap + shift;
        const factor = 5;

        if (leftGap < 0) {
            const shiftedMathCoord = -Math.pow(leftGap, 2) + shift;

            newCoord = left + (shiftedMathCoord < 0
                ? Math.sign(shiftedMathCoord)
                    * Math.sqrt(Math.abs(shiftedMathCoord)) * factor
                : shiftedMathCoord);
        }
        else if (rightGap > 0) {
            const shiftedMathCoord = Math.pow(rightGap, 2) + shift;

            newCoord = right + (shiftedMathCoord > 0
                ? Math.sign(shiftedMathCoord)
                    * Math.sqrt(Math.abs(shiftedMathCoord)) * factor
                : shiftedMathCoord);
        }
        else if (shiftedRightGap > 0) {
            newCoord = right + Math.sign(shiftedRightGap)
                * Math.sqrt(Math.abs(shiftedRightGap)) * factor;
        }
        else if (shiftedLeftGap < 0) {
            newCoord = left + Math.sign(shiftedLeftGap)
                * Math.sqrt(Math.abs(shiftedLeftGap)) * factor;
        }
        else {
            newCoord = realCoord + shift;
        }

        return newCoord;
    }

    correct(): void {
        const viewer = this.viewer.getBoundingClientRect();
        const {mapCtx: map, setMapCtx} = this.viewerCtx;

        if (map.x > 0) this.viewerCtx.setMapCtx({x: 0});
        else if (map.x + map.width * map.scale < viewer.width) {
            setMapCtx({x: Math.round(viewer.width - map.width * map.scale)});
        }

        if (map.y > 0) setMapCtx({y: 0});
        else if (map.y + map.height * map.scale < viewer.height) {
            setMapCtx({y: Math.round(viewer.height - map.height * map.scale)});
        }
    }
}

