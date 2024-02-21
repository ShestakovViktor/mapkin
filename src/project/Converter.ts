import {Media, Project} from "@project";
import {ArchiveDriver} from "@src/interface";
import {Data} from "@src/type";

type Blobs = {[key: string]: Blob};

export class Converter {
    private media: Media;

    private paths = {
        static: "static",
        source: "source.json",
        data: "data.json",

        template: "website.html",
        bundle: "website.js",
    };

    constructor(private archiveDriver: ArchiveDriver) {
        this.media = new Media();
    }

    async exportProject(project: Project): Promise<Blob> {
        const blobs = this.exportData(project);
        return await this.archiveDriver.archive(blobs);
    }

    private exportData(project: Project): {[key: string]: Blob} {
        const projectData = project.getData();
        const [source, blobs] = this.splitSourcesToBase64(projectData.source);
        const data = {...projectData, source};

        const dataString = JSON.stringify(data, null, 4);
        const dataType = "application/json;charset=utf-8";
        const dataBlob = new Blob([dataString], {type: dataType});

        return {[this.paths.data]: dataBlob, ...blobs};
    }

    private splitSourcesToBase64(data: {[key: string]: string}): [
        {[key: string]: string},
        {[key: string]: Blob},
    ] {
        const source: {[key: string]: string} = {};
        const blobs: Blobs = {};

        for (const name in data) {
            const sourceBase64 = data[name];
            const sourceBlob = new Blob([sourceBase64], {type: "text/plain"});

            source[name] = `${this.paths.static}/${name}.b64`;
            blobs[source[name]] = sourceBlob;
        }

        return [source, blobs];
    }

    async importProject(blob: Blob): Promise<Data> {
        const files = await this.archiveDriver.extract(blob);
        const data = await this.importData(files);

        return data;
    }

    private async importData(files: Blobs): Promise<Data> {
        const dataString = await files[this.paths.data].text();
        const data = JSON.parse(dataString) as Data;

        for (const name in data.source) {
            const path = data.source[name];
            data.source[name] = await files[path].text();
        }

        return data;
    }

    async exportSite(project: Project): Promise<Blob> {
        const blobs = await this.exportStatic(project);
        return await this.archiveDriver.archive(blobs);
    }

    private async exportStatic(project: Project): Promise<Blobs> {
        const projectData = project.getData();
        const [source, blobs] = this.splitSourcesToFiles(projectData.source);

        const data = {...projectData, source};

        return {
            [this.paths.template]: await this.getTemplate(data),
            [this.paths.bundle]: await this.getBundle(),
            ...blobs,
        };
    }

    private splitSourcesToFiles(data: {[key: string]: string}): [
        {[key: string]: string},
        {[key: string]: Blob},
    ] {
        const source: {[key: string]: string} = {};
        const blobs: Blobs = {};

        for (const name in data) {
            const sourceRawString = data[name];
            const sourceData = sourceRawString.split(/[;:,]/);

            const mimeType = sourceData[1];
            const base64String = sourceData[3];

            const sourceExt = this.media.typeToExtension(mimeType);
            const sourceBytes = this.base64toBytes(base64String);

            source[name] = `${this.paths.static}/${name}.${sourceExt}`;
            blobs[source[name]] = new Blob([sourceBytes], {type: mimeType});
        }

        return [source, blobs];
    }

    private base64toBytes(base64String: string): Uint8Array {
        const byteCharacters = atob(base64String);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
        }

        const byteArray = new Uint8Array(byteArrays);

        return byteArray;
    }

    private async getTemplate(data: Data): Promise<Blob> {
        const fileName = "website.html";
        const response = await fetch(fileName);

        const dataString = JSON.stringify(data);
        const dataTemplate = `const json = '${dataString}';`;

        let template = await response.text();
        template = template.replace("/**/", dataTemplate);

        return new Blob([template], {type: "text/html"});
    }

    private async getBundle(): Promise<Blob> {
        const fileName = "website.js";
        const response = await fetch(fileName);
        const viewerBundle = await response.blob();

        return viewerBundle;
    }
}