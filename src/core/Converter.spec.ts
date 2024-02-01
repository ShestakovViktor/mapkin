import assert from "assert";
import {Converter} from "./Converter";
import {MockArchiveDriver} from "./driver";
import {Data} from "@src/type";
import {Project} from "./Project";

const markerBase64 = `
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXR
FWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAStJREFUOI1900suhFEQBeDvEo9oM49J62
1IDDQLYA3YADGQmEu8lmDIWAhhhISRR4jXAkiwAcJE0iaFq/3dlZyk7j2nTt1U5arVanKgEzM4x1vgF
NPo+KevK67gFlsYQSkwim3coFJoEJ3vMFffJdPM4zp/SU7OYjPyDqziJbCC9uC2MVNkcIHhyFexhzIG
sI/l4EZwVmTwhlLkLyjXzeY58m68fnMtfuMDXdk5KY4S3r8PucEVqpFvYC2lVEkpVbCG9eCquPypyp4
5id1siCt4DixlQ9zHRKM1PmKoyRoH8aBojSGYwnETg6O8e5FBK+4xVlA8HlxrQ4Nsz0/oy+76467a9C
9kBYsxrBTYwUKRNkXBn0gpteEEh7Hq0ej++U/cZGC9YXCAnka6LwGnj6przgk1AAAAAElFTkSuQmCC
`;

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
            assets: {"test": markerBase64},
        };

        const oldProject = new Project(data);

        const blob = await converter.exportProject(oldProject);

        const newProject = await converter.importProject(blob);

        console.log(oldProject.getAssets(), newProject.getAssets());

        assert.deepEqual(oldProject.getData(), newProject.getData());
        assert.deepEqual(oldProject.getAssets(), newProject.getAssets());
    });
});