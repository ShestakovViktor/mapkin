import JSZip from "jszip";


export class Converter {


    /** @param {import("@core").Project} project */
    constructor(project) {

        /** @type {import("@core").Project} */
        this.project = project;

        this.paths = {
            source: "source",
            asset: "static",
            data: "data.json",
        };
    }


    /** @param {JSZip} archive */
    archiveData(archive) {
        archive.file(
            this.paths.data,
            JSON.stringify(this.project.data, null, 4)
        );
    }


    /** @param {JSZip} archive */
    async extractData(archive) {
        const dataString = await archive
            .files[this.paths.data]
            .async("text");

        this.project.data = JSON.parse(dataString);
    }


    /** @param {JSZip} archive */
    archiveAsset(archive) {
        const resourceFolder = archive.folder(this.paths.asset);
        if (!resourceFolder) throw new Error();

        Object.entries(this.project.assets)
            .forEach(([name, blob]) => {
                resourceFolder.file(`${name}.jpg`, blob);
            });
    }


    /** @param {JSZip} archive */
    async extractAsset(archive) {

        /** @type {Promise<any>[]} */
        const promises = [];

        for (let path in archive.files) {
            if (!path.includes(this.paths.asset)) continue;

            const fileName = path.split("/")[1];
            const name = fileName.split(".")[0];
            const options = {type: "image/png"};

            promises.push(
                archive.files[path]
                    .async("blob")
                    .then(data => {
                        this.project.assets[name] = new Blob([data], options);
                    })
            );
        }

        await Promise.all(promises);
    }


    /** @param {JSZip} archive */
    exportSource(archive) {
        const sourceFolder = archive.folder(this.paths.source);
        if (!sourceFolder) throw new Error();

        if (this.project.src) {
            const extension = this.project.src.map.name.split(".")[1];
            sourceFolder.file(`map.${extension}`, this.project?.src.map);
        }
    }


    /** @return {Promise<File>} */
    async export() {
        const archive = JSZip();

        this.archiveData(archive);
        this.archiveAsset(archive);
        this.exportSource(archive);

        const archiveBlob = await archive.generateAsync({type: "blob"});

        const archiveFile = new File(
            [archiveBlob],
            `${this.project.data.name}.mp`
        );

        return archiveFile;
    }


    /** @param {File} file */
    async import(file) {
        const archive = await JSZip.loadAsync(file);

        await this.extractData(archive);
        await this.extractAsset(archive);
    }


    async exportAsSite() {
        const archive = new JSZip();

        const promises = [
            "website.js",
            "website.html"
        ].map((name) => {
            return fetch(name)
                .then((response) => {
                    return response.blob();
                })
                .then((blob) => {
                    return blob.text();
                })
                .then((text) => {
                    if (name == "website.html") {
                        text = text.replace(
                            "/**/",
                            `const project = '${JSON.stringify(this.project.data)}';`
                        );
                    }
                    return archive.file(name, new Blob([text]));
                });
        });

        await Promise.all(promises);

        this.archiveAsset(archive);

        const resultBlob = await archive.generateAsync({type:"blob"});

        return new File([resultBlob], `${this.project.data.name}.zip`);
    }
}