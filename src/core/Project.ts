import {Data, Marker} from "@src/type";
import {Converter} from "./Converter";



export class Project {
    data: Data;
    converter: Converter;
    assets: {[key: string]: Blob};
    src: {[key: string]: File};

    constructor() {
        this.data = {
            name: "",
            size: {width: 0, height: 0},
            grid: {rows: 0, cols: 0},

            layout: {
                tiles: [],
                markers: [],
            },
        };

        this.assets = {};
        this.src = {};

        this.converter = new Converter(this);
    }


    addMarker(marker: Marker): void {
        this.data.layout.markers.push(marker);
    }


    async init(params: {
        projectName: string;
        mapFile: File;
        horizontalTilesNumber: number;
        verticalTilesNumber: number;
    }): Promise<void> {
        const image = await this.initImage(params.mapFile);

        this.data = {
            name: params.projectName,
            size: {
                width: image.width,
                height: image.height,
            },
            grid: {
                rows: params.verticalTilesNumber,
                cols: params.horizontalTilesNumber,
            },
            layout: {
                tiles: [],
                markers: [],
            },
        };

        await this.initTiles(image);


        const response = await fetch("./icon/marker.svg");
        const blob = await response.blob();
        this.assets.marker = blob;


        this.src = {
            map: params.mapFile,
        };

    }


    async initImage(blob: Blob): Promise<HTMLImageElement> {
        const url = URL.createObjectURL(blob);
        const image = document.createElement("img");
        image.src = url;
        await new Promise(resolve => image.onload = resolve);
        return image;
    }


    async initTiles(image: HTMLImageElement): Promise<void> {
        const tileWidth = this.data.size.width
            / this.data.grid.cols;
        const tileHeight = this.data.size.height
            / this.data.grid.rows;

        const canvas = document.createElement("canvas");
        canvas.width = tileWidth;
        canvas.height = tileHeight;
        const context = canvas.getContext("2d");
        if (!context) throw new Error();

        for await (const yi of Array(this.data.grid.cols).keys()) {
            for await (const xi of Array(this.data.grid.rows).keys()) {

                const x = xi * tileWidth;
                const y = yi * tileHeight;

                context.drawImage(
                    image,
                    x, y, tileWidth, tileHeight,
                    0, 0, canvas.width, canvas.height
                );

                const blob = await new Promise<Blob | null>(
                    resolve => canvas.toBlob(resolve, "image/jpeg")
                );

                if (blob) {
                    const name = `${xi}-${yi}`;
                    this.data.layout.tiles.push({
                        asset: name,
                        width: tileWidth,
                        height: tileHeight,
                        x,
                        y,
                    });
                    this.assets[name] = blob;
                }
            }
        }
    }
}