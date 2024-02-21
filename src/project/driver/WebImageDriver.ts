import {ImageDriver, ImageTile} from "@src/interface";

export class WebImageDriver implements ImageDriver {

    async fooImage(
        file: File
    ): Promise<string> {
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        await new Promise(resolve => image.onload = resolve);

        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        if (!context) throw new Error();

        context.drawImage(
            image,
            0, 0, image.width, image.height,
            0, 0, canvas.width, canvas.height
        );

        const base64 = canvas.toDataURL("image/png");

        image.remove();
        canvas.remove();

        return base64;
    }

    async initImage(blob: Blob, rows: number, cols: number): Promise<{
        width: number;
        height: number;
        tiles: ImageTile[];
    }> {
        const url = URL.createObjectURL(blob);
        const image = document.createElement("img");
        image.src = url;
        await new Promise(resolve => image.onload = resolve);

        const tileWidth = image.width / cols;
        const tileHeight = image.height / rows;

        const canvas = document.createElement("canvas");
        canvas.width = tileWidth;
        canvas.height = tileHeight;
        const context = canvas.getContext("2d");
        if (!context) throw new Error();

        const tiles: ImageTile[] = [];

        for await (const yi of Array(cols).keys()) {
            for await (const xi of Array(rows).keys()) {

                const x = xi * tileWidth;
                const y = yi * tileHeight;

                context.drawImage(
                    image,
                    x, y, tileWidth, tileHeight,
                    0, 0, canvas.width, canvas.height
                );

                const base64 = canvas.toDataURL("image/jpeg");

                tiles.push({
                    x,
                    y,
                    width: tileWidth,
                    height: tileHeight,
                    base64,
                });
            }
        }

        return {
            width: image.width,
            height: image.height,
            tiles,
        };
    }
}