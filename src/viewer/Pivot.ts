export class Pivot {
    x = 0;

    y = 0;

    scale = 1;

    getX(): number {
        return this.x;
    }

    setX(x: number): void {
        this.x = x;
    }

    getY(): number {
        return this.y;
    }

    setY(y: number): void {
        this.y = y;
    }

    setScale(scale: number): void {
        this.scale = scale;
    }

    getScale(): number {
        return this.scale;
    }
}