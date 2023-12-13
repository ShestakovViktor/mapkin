import JSZip from "jszip";



export class Converter {
    /** @param {import("@core").Project} project */
    constructor(project) {

        /** @type {import("@core").Project} project */
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
        const zip = new JSZip();

        const tilesFolder = zip.folder("tiles");

        if (tilesFolder) {
            Object.entries(this.project.tiles)
                .forEach(([name, blob]) => {
                    tilesFolder.file(`${name}.jpg`, blob);
                });
        }

        const srcFolder = zip.folder("src");

        if (this.project.src && srcFolder) {
            const extension = this.project.src.map.name.split(".")[1];
            srcFolder.file(`map.${extension}`, this.project?.src.map);
        }


        zip.file("props.json", JSON.stringify(this.project.props));
        zip.file("layout.json", JSON.stringify(this.project.layout));

        const blob = await zip.generateAsync({type:"blob"});

        return new File([blob], `${this.project.props.name}.mp`);
    }
}