export class Media {
    constructor() {
        /** @type {{type: string, extension: string}[]} */
        this.media = [
            {type: "image/svg+xml", extension: "svg"},
            {type: "image/png", extension: "png"},
            {type: "image/jpg", extension: "jpg"},
        ];
    }

    /**
     * @param {string} type
     * @return {string | undefined}
     */
    typeToExtension(type) {
        return this.media
            .find((content) => content.type == type)?.extension;
    }

    /**
     * @param {string} extension
     * @return {string | undefined}
     */
    extensionToType(extension) {
        return this.media
            .find((content) => content.extension == extension)?.type;
    }
}