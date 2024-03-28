import {Media} from "./Media";

import assert from "assert";

describe("Media", () => {
    it("Convert media type to file extension", function () {
        const media = new Media();

        assert.equal(media.typeToExtension("image/svg+xml"), "svg");
    });

    it("Convert file extension to media type", function () {
        const media = new Media();

        assert.equal(media.extensionToType("svg"), "image/svg+xml");
    });
});