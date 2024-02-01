import {Marker} from "@src/type";
import {Project} from "./Project";

import assert from "assert";

describe("Project", () => {
    it("Init empty project", () => {
        const project = new Project();
        const data = project.getData();

        assert.equal(data.name, "New project");
        assert.deepEqual(data.size, {width: 0, height: 0});
        assert.deepEqual(data.grid, {rows: 0, cols: 0});

    });

    it("Add asset", () => {
        const project = new Project();

        const assetId = project.addAsset("qwe");

        assert.notEqual(assetId, undefined);
    });

    it("Add entity", () => {
        const project = new Project();

        const entityData: Marker = {
            type: "marker",
            x: 0,
            y: 0,
            text: "",
            asset: "",
        };

        const entityId = project.addEntity(entityData);

        const entityItem = project.getEntity(entityId);

        assert.deepEqual(entityData, entityItem);
    });

    it("Init project with params", () => {
        const project = new Project();
        const data = project.getData();

        assert.equal(data.name, "New project");
        assert.deepEqual(data.size, {width: 0, height: 0});
        assert.deepEqual(data.grid, {rows: 0, cols: 0});
    });
});