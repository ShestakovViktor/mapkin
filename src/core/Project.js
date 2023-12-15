import {Converter} from "./Converter";

/**
 * @typedef {{
    * projectName: string;
    * mapFile: File;
    * horizontalTilesNumber: number;
    * verticalTilesNumber: number;
 * }} Params
 */

/**
 * @typedef {{
    * name: string
    * size: {width: number; height: number};
    * grid: {rows: number; cols: number;};
    * tile: {width: number, height: number};
 * }} Props
 */

/**
 * @typedef {{
    * x: number,
    * y: number,
    * tile: string
 * }} Tile
 */

export class Project {
    constructor() {
        /** @type {Props} */
        this.props = {
            name: "",
            size: {width: 0, height: 0},
            grid: {rows: 0, cols: 0},
            tile: {width: 0, height: 0},
        };

        /** @type {{[key: string]: Blob}} */
        this.tiles = {};

        /** @type {Tile[]} */
        this.layout = [];

        /** @type {{map: File} | undefined} */
        this.src = undefined;

        this.converter = new Converter(this);
    }


    /** @param {Params} params */
    async init(params) {
        this.image = await this.initImage(params.mapFile);

        this.props = {
            name: params.projectName,
            size: {
                width: this.image.width,
                height: this.image.height
            },
            grid: {
                rows: params.verticalTilesNumber,
                cols: params.horizontalTilesNumber,
            },
            tile: {
                width: this.image.width / params.horizontalTilesNumber,
                height: this.image.height / params.verticalTilesNumber,
            }
        };

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

        const canvas = document.createElement("canvas");
        canvas.width = this.props.tile.width;
        canvas.height = this.props.tile.height;
        const context = canvas.getContext("2d");
        if (!context) throw new Error();

        for await (let yi of Array(this.props.grid.cols).keys()) {
            for await (let xi of Array(this.props.grid.rows).keys()) {

                const x = xi * this.props.tile.width;
                const y = yi * this.props.tile.height;

                context.drawImage(
                    this.image,
                    x, y, this.props.tile.width, this.props.tile.height,
                    0, 0, canvas.width, canvas.height
                );

                const blob = await new Promise(
                    resolve => canvas.toBlob(resolve)
                );

                if (blob) {
                    this.layout.push({x, y, tile: `${xi}-${yi}`});
                    this.tiles[`${xi}-${yi}`] = blob;
                }
            }
        }
    }
}