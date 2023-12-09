import JSZip from "jszip";

/**
 * @typedef {Object} projectParams
 * @property {string} projectName
 * @property {File} mapFile
 * @property {number} horizontalTilesNumber
 * @property {number} verticalTilesNumber
 * */


export class Core {
    /**
     * @param {import("@src/engine").Engine} engine
     */
    constructor(engine) {
        this.engine = engine;
    }

    /**
     * @param {projectParams} params
     * */
    async createProject(params) {
        const file = params.mapFile;

        const image = await this.initImage(file);
        const map = await this.initMap(image, params);
        const tiles = await this.initTiles(image, map);

        /** @type {import("@type").Project} */
        const project = {name: params.projectName, map, tiles};

        this.engine.init(project);
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


    /**
     * @param {HTMLImageElement} image
     * @param {Object} params
     * @param {number} params.horizontalTilesNumber
     * @param {number} params.verticalTilesNumber
     * @return {Promise<import("@type").Map>}
     */
    async initMap(image, params) {
        /** @type {import("@type").Map} */
        const map = {
            width: image.width,
            height: image.height,
            layout: {
                horizontal: params.horizontalTilesNumber,
                vertial: params.verticalTilesNumber,
            },
            tile: {
                width:  image.width / params.horizontalTilesNumber,
                height: image.height / params.verticalTilesNumber,
            }
        };

        return map;
    }


    /**
     * @param {HTMLImageElement} image
     * @param {import("@type").Map} map
     * @return {Promise<import("@type").Tile[]>}
     */
    async initTiles(image, map) {
        const canvas = document.createElement("canvas");
        canvas.width = map.tile.width;
        canvas.height = map.tile.height;
        const context = canvas.getContext("2d");
        if (!context) throw new Error();

        /** @type {import("@type").Tile[]} */
        const tiles = [];

        for await (let yi of Array(map.layout.vertial).keys()) {
            for await (let xi of Array(map.layout.horizontal).keys()) {

                const x = xi * map.tile.width;
                const y = yi * map.tile.height;

                context.drawImage(
                    image,
                    x, y, map.tile.width, map.tile.height,
                    0, 0, canvas.width, canvas.height
                );

                const blob = await new Promise(
                    resolve => canvas.toBlob(resolve)
                );

                if (blob) tiles.push({name: `${x}-${y}`, x, y, blob});
            }
        }

        return tiles;
    }

    download() {
        const zip = new JSZip();
        console.log(zip);

        // imagePieces.forEach((piece, index) => {
        //     zip.file(`peace-${index}.jpg`, piece);
        // });

        // const archive = await zip.generateAsync({type:"blob"});
        // const tempLink = document.createElement("a");

        // const archiveUrl = URL.createObjectURL(archive);

        // tempLink.download = "example.zip";
        // tempLink.href = archiveUrl;
        // tempLink.click();
    }
}