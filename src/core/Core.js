import JSZip from "jszip";


export class Core {
    /**
     * @param {import("@src/engine").Engine} engine
     */
    constructor(engine) {
        this.engine = engine;
    }

    /**
     * @param {string} name
     * @param {File} file
     * */
    async createProject(name, file) {
        const url = URL.createObjectURL(file);

        const srcImage = document.createElement("img");
        srcImage.src = url;
        await new Promise(resolve => srcImage.onload = resolve);

        const dimension = 5;

        /** @type import("@type").Project */
        const project = {
            name,
            mapWidth: srcImage.width,
            mapHeight: srcImage.height,

            tileWidth: srcImage.width / dimension,
            tileHeight: srcImage.height / dimension,

            tiles: []
        };

        const canvas = document.createElement("canvas");
        canvas.width = project.mapWidth;
        canvas.height = project.mapHeight;
        const context = canvas.getContext("2d");
        if (!context) throw new Error();

        for await (let yIndex of Array(dimension).keys()) {
            for await (let xIndex of Array(dimension).keys()) {

                const x = xIndex * project.tileWidth;
                const y = yIndex * project.tileHeight;

                context.drawImage(
                    srcImage,
                    x, y, project.tileWidth, project.tileHeight,
                    0, 0, canvas.width, canvas.height
                );

                const blob = await new Promise(
                    resolve => canvas.toBlob(resolve)
                );

                if (blob) project.tiles.push({x, y, blob});
            }
        }

        console.log(project);
        this.engine.init(project);
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