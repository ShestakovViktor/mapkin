import {Media, Project} from "@core";
import {ArchiveDriver} from "@src/interface";
import {Data} from "@src/type";

type Foo = {[key: string]: Blob};

export class Converter {
    private media: Media;

    private paths = {
        source: "source",
        asset: "static",
        data: "data.json",
    };

    constructor(private archiveDriver: ArchiveDriver) {
        this.media = new Media();
    }

    async exportProject(project: Project): Promise<Blob> {
        const data = {
            ...this.getData(project),
            ...this.getAssets(project),
        };
        return await this.archiveDriver.archive(data);
    }

    async exportSite(project: Project): Promise<Blob> {
        const data = {
            ...await this.getTemplate(project),
            ...await this.getBundle(),
            ...this.getAssets(project),
        };
        return await this.archiveDriver.archive(data);
    }

    private getData(project: Project): {[key: string]: Blob} {
        const result: {[key: string]: Blob} = {};

        const dataString = JSON.stringify(
            project.getData(), null, 4
        );

        const dataBlob = new Blob([dataString], {
            type: "application/json;charset=utf-8",
        });

        result[this.paths.data] = dataBlob;

        return result;
    }

    private getAssets(project: Project): {[key: string]: Blob} {
        const result: {[key: string]: Blob} = {};
        const assets = project.getAssets();

        for (const assetName in assets) {
            const assetBlob = assets[assetName];
            const assetExt = this.media.typeToExtension(assetBlob.type);
            const assetPath = `${this.paths.asset}/${assetName}.${assetExt}`;
            result[assetPath] = assetBlob;
        }

        return result;
    }

    private async getTemplate(project: Project): Promise<Foo> {
        const fileName = "website.html";
        const response = await fetch(fileName);

        const dataString = JSON.stringify(project.getData());
        const dataTemplate = `const project = '${dataString}';`;

        let template = await response.text();
        template = template.replace("/**/", dataTemplate);

        return {[fileName]: new Blob([template], {type: "text/html"})};
    }

    private async getBundle(): Promise<Foo> {
        const fileName = "website.js";
        const response = await fetch(fileName);
        const viewerBundle = await response.blob();

        return {[fileName]: viewerBundle};
    }

    async importProject(blob: Blob): Promise<Project> {
        const files = await this.archiveDriver.extract(blob);

        const data = await this.extractData(files);
        const assets = this.extractAsset(files);

        const project = new Project({data, assets});
        return project;
    }

    private async extractData(files: Foo): Promise<Data> {
        const dataString = await files[this.paths.data].text();
        const data = JSON.parse(dataString);
        return data;
    }

    private extractAsset(files: Foo): Foo {
        const result: Foo = {};

        for (const path in files) {
            if (!path.includes(this.paths.asset)) continue;

            const fileBlob = files[path];
            const fileName = path.split("/")[1];
            const [name, extension] = fileName.split(".");

            if (!extension) continue;

            const options = {type: this.media.extensionToType(extension)};

            result[name] = new Blob([fileBlob], options);
        }

        return result;
    }
}