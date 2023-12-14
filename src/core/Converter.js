import JSZip from "jszip";



export class Converter {
    /** @param {import("@core").Project} project */
    constructor(project) {

        /** @type {import("@core").Project} */
        this.project = project;
    }

    /** @param {File} file */
    async import(file) {
        const zip = await JSZip.loadAsync(file);

        /** @type {Promise<{path: string, data: Blob}>[]} */
        const promises = [];

        for (let path in zip.files) {
            promises.push(new Promise (
                (resolve) => zip.files[path].async("blob")
                    .then(data => resolve({path, data}))
            ));
        }

        const files = await Promise.all(promises);

        for await (const {path, data} of files) {
            if (path.includes("tiles/")) {
                const fileName = path.split("/")[1];
                const name = fileName.split(".")[0];
                this.project.tiles[name] = new Blob(
                    [data],
                    {type: "image/png"},
                );
            }
            else if (path == "props.json") {
                const string = await data.text();
                this.project.props = JSON.parse(string);
            }
            else if (path == "layout.json") {
                const string = await data.text();
                this.project.layout = JSON.parse(string);
            }
        }

    }

    /** @return {Promise<File>} */
    async export() {
        const result = new JSZip();

        const tilesFolder = result.folder("tiles");

        if (tilesFolder) {
            Object.entries(this.project.tiles)
                .forEach(([name, blob]) => {
                    tilesFolder.file(`${name}.jpg`, blob);
                });
        }

        const srcFolder = result.folder("src");

        if (this.project.src && srcFolder) {
            const extension = this.project.src.map.name.split(".")[1];
            srcFolder.file(`map.${extension}`, this.project?.src.map);
        }


        result.file("props.json", JSON.stringify(this.project.props));
        result.file("layout.json", JSON.stringify(this.project.layout));

        const resultBlob = await result.generateAsync({type:"blob"});

        return new File([resultBlob], `${this.project.props.name}.mp`);
    }


    async compile() {
        const result = new JSZip();

        const projectFile = await this.export();
        result.file("project.mp", projectFile);

        const promises = [
            "viewer.js",
            "viewer.html"
        ].map((name) => {
            return fetch(name)
                .then((response) => {
                    return response.blob();
                })
                .then((blob) => {
                    return result.file(name, blob);
                });
        });

        await Promise.all(promises);

        const resultBlob = await result.generateAsync({type:"blob"});

        return new File([resultBlob], `${this.project.props.name}.zip`);

    }
}