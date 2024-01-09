import assert from "assert";
import {Converter} from "./Converter";
import {MockArchiveDriver} from "./driver";
import {Data} from "@src/type";
import {Project} from "./Project";

describe("Converter", () => {
    it("Export and import project", async () => {
        const archiveDriver = new MockArchiveDriver();
        const converter = new Converter(archiveDriver);

        const data: Data = {
            name: "New project",
            size: {width: 1024, height: 0},
            grid: {rows: 0, cols: 0},
            entity: {"test": {type: "group"}},
            layout: {id: "test", childs: []},
        };

        const assets: {[key: string]: Blob} = {
            "test": new Blob([], {type: "image/jpg"}),
        };

        const oldProject = new Project({data, assets});

        const blob = await converter.exportProject(oldProject);

        const newProject = await converter.importProject(blob);

        assert.deepEqual(oldProject.getData(), newProject.getData());
        assert.deepEqual(oldProject.getAssets(), newProject.getAssets());
    });
});