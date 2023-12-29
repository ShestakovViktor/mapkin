import {Project} from "./Project";

import assert from "assert";

describe("Project", function () {
    it("Init", function () {
        const project = new Project();
        assert.equal(project.data.name, "new Project");
    });
});