import {Media, Project} from "@core";
import {ArchiveDriver} from "@src/interface";
import {Data} from "@src/type";

type Blobs = {[key: string]: Blob};

export class Converter {
    private media: Media;

    private paths = {
        static: "static",
        asset: "asset.json",
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
        const [assets, blobs] = this.splitAssetsToBase64(projectData.assets);
        const data = {...projectData, assets};

        const dataString = JSON.stringify(data, null, 4);
        const dataType = "application/json;charset=utf-8";
        const dataBlob = new Blob([dataString], {type: dataType});

        return {[this.paths.data]: dataBlob, ...blobs};
    }

    private splitAssetsToBase64(data: {[key: string]: string}): [
        {[key: string]: string},
        {[key: string]: Blob},
    ] {
        const assets: {[key: string]: string} = {};
        const blobs: Blobs = {};

        for (const asset in data) {
            const assetBase64 = data[asset];
            const assetBlob = new Blob([assetBase64], {type: "text/plain"});

            assets[asset] = `${this.paths.static}/${asset}.b64`;
            blobs[assets[asset]] = assetBlob;
        }

        return [assets, blobs];
    }

    async importProject(blob: Blob): Promise<Project> {
        const files = await this.archiveDriver.extract(blob);
        const data = await this.importData(files);
        const project = new Project(data);

        return project;
    }

    private async importData(files: Blobs): Promise<Data> {
        const dataString = await files[this.paths.data].text();
        const data = JSON.parse(dataString);

        for (const asset in data.assets) {
            const path = data.assets[asset];
            data.assets[asset] = await files[path].text();
        }

        return data;
    }

    async exportSite(project: Project): Promise<Blob> {
        const blobs = await this.exportStatic(project);
        return await this.archiveDriver.archive(blobs);
    }

    private async exportStatic(project: Project): Promise<Blobs> {
        const projectData = project.getData();
        const [assets, blobs] = this.splitAssetsToFiles(projectData.assets);

        const data = {...projectData, assets};

        return {
            [this.paths.template]: await this.getTemplate(data),
            [this.paths.bundle]: await this.getBundle(),
            ...blobs,
        };
    }

    private splitAssetsToFiles(data: {[key: string]: string}): [
        {[key: string]: string},
        {[key: string]: Blob},
    ] {
        const assets: {[key: string]: string} = {};
        const blobs: Blobs = {};

        for (const asset in data) {
            const assetRawString = data[asset];
            const assetData = assetRawString.split(/[;:,]/);

            const mimeType = assetData[1];
            const base64String = assetData[3];

            const assetExt = this.media.typeToExtension(mimeType);
            const assetBytes = this.base64toBytes(base64String);

            assets[asset] = `${this.paths.static}/${asset}.${assetExt}`;
            blobs[assets[asset]] = new Blob([assetBytes], {type: mimeType});
        }

        return [assets, blobs];
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