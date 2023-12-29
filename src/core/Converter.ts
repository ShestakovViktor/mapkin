import JSZip from "jszip";
import {Media, Project} from "@core";


export class Converter {
    private media: Media;
    private project: Project;

    private paths = {
        source: "source",
        asset: "static",
        data: "data.json",
    };


    constructor(project: Project) {
        this.media = new Media();
        this.project = project;
    }


    async export(): Promise<File> {
        const archive = JSZip();

        this.archiveData(archive);
        this.archiveAsset(archive);
        this.archiveSource(archive);

        const archiveBlob = await archive.generateAsync({type: "blob"});

        const archiveFile = new File(
            [archiveBlob],
            `${this.project.data.name}.mp`
        );

        return archiveFile;
    }


    archiveData(archive: JSZip): void {
        archive.file(
            this.paths.data,
            JSON.stringify(this.project.data, null, 4)
        );
    }


    archiveAsset(archive: JSZip): void {
        const resourceFolder = archive.folder(this.paths.asset);
        if (!resourceFolder) throw new Error();

        Object.entries(this.project.assets)
            .forEach(([name, blob]) => {

                const ext = this.media.typeToExtension(blob.type);

                resourceFolder.file(`${name}.${ext}`, blob);
            });
    }


    archiveSource(archive: JSZip): void {
        const sourceFolder = archive.folder(this.paths.source);
        if (!sourceFolder) throw new Error();

        const extension = this.project.src.map.name.split(".")[1];
        sourceFolder.file(`map.${extension}`, this.project.src.map);
    }


    async import(file: File): Promise<void> {
        const archive = await JSZip.loadAsync(file);

        await this.extractData(archive);
        await this.extractAsset(archive);
    }


    async extractData(archive: JSZip): Promise<void> {
        const dataString = await archive
            .files[this.paths.data]
            .async("text");

        this.project.data = JSON.parse(dataString);
    }


    async extractAsset(archive: JSZip): Promise<void> {

        /** @type {Promise<any>[]} */
        const promises = [];

        for (const path in archive.files) {
            if (!path.includes(this.paths.asset)) continue;

            const fileName = path.split("/")[1];
            const [name, extension] = fileName.split(".");

            if (!extension) continue;

            const options = {type: this.media.extensionToType(extension)};

            promises.push(
                archive.files[path]
                    .async("blob")
                    .then(data => {
                        console.log(path);
                        this.project.assets[name] = new Blob([data], options);
                    })
            );
        }

        await Promise.all(promises);
    }


    async exportAsSite(): Promise<File> {
        const archive = new JSZip();

        const promises = [
            "website.js",
            "website.html",
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