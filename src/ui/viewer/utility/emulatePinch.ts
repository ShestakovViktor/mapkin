export function emulatePinch(el: HTMLElement, startX = 0, startY = 0): void {
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
