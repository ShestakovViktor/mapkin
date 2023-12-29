export class Media {
    private media = [
        {type: "image/svg+xml", extension: "svg"},
        {type: "image/png", extension: "png"},
        {type: "image/jpg", extension: "jpg"},
    ];

    typeToExtension(type: string): string | undefined {
        return this.media
            .find((content) => content.type == type)?.extension;
    }

    extensionToType(extension: string): string | undefined {
        return this.media
            .find((content) => content.extension == extension)?.type;
    }
}