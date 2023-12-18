import {Converter} from "./Converter";



export class Project {
    constructor() {
        /** @type {import("@type").Data} */
        this.data = {
            name: "",
            size: {width: 0, height: 0},
            grid: {rows: 0, cols: 0},

            layout: {
                tiles: [],
                markers: [],
            }
        };

        /** @type {{[key: string]: Blob}} */
        this.assets = {};

        /**
         * @type {{
         *     tiles: import("@type").Tile[];
         *     markers: import("@type").Marker[];
         * }}
         */
        /** @type {{map: File} | undefined} */
        this.src = undefined;

        this.converter = new Converter(this);
    }


    /** @param {import("@type").Marker} marker */
    addMarker(marker) {
        this.data.layout.markers.push(marker);
    }


    /**
     * @param {{
     *     projectName: string;
     *     mapFile: File;
     *     horizontalTilesNumber: number;
     *     verticalTilesNumber: number;
     * }} params
     */
    async init(params) {
        this.image = await this.initImage(params.mapFile);

        this.data = {
            name: params.projectName,
            size: {
                width: this.image.width,
                height: this.image.height
            },
            grid: {
                rows: params.verticalTilesNumber,
                cols: params.horizontalTilesNumber,
            },
            layout: {
                tiles: [],
                markers: [],
            }
        };


        const response = await fetch("./icon/marker.svg");
        const blob = await response.blob();
        this.assets["marker"] = blob;


        this.src = {
            map: params.mapFile,
        };

        await this.initTiles();
    }


    /**
     * @param {Blob} file
     * @return {Promise<HTMLImageElement>}
     */
    async initImage(file) {
        const url = URL.createObjectURL(file);
        const image = document.createElement("img");
        image.src = url;
        await new Promise(resolve => image.onload = resolve);
        return image;
    }


    async initTiles() {
        if (!this.image) return;

        const tileWidth = this.data.size.width
            / this.data.grid.cols;
        const tileHeight = this.data.size.height
            / this.data.grid.rows;

        const canvas = document.createElement("canvas");
        canvas.width = tileWidth;
        canvas.height = tileHeight;
        const context = canvas.getContext("2d");
        if (!context) throw new Error();

        for await (let yi of Array(this.data.grid.cols).keys()) {
            for await (let xi of Array(this.data.grid.rows).keys()) {

                const x = xi * tileWidth;
                const y = yi * tileHeight;

                context.drawImage(
                    this.image,
                    x, y, tileWidth, tileHeight,
                    0, 0, canvas.width, canvas.height
                );

                const blob = await new Promise(
                    resolve => canvas.toBlob(resolve)
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