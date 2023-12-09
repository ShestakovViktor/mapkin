export class Engine {
    /**
     * @param {HTMLElement} root
     */
    constructor(root) {
        const mapContainer = document.createElement("div");
        mapContainer.id = "map";
        this.mapContainer = mapContainer;
        root.appendChild(mapContainer);


        const overlay = document.createElement("div");
        overlay.id = "overlay";
        root.appendChild(overlay);
    }

    /** @param {import("@type").Project} project */
    init(project) {
        this.mapContainer.style.width = `${project.mapWidth}px`;
        this.mapContainer.style.height = `${project.mapHeight}px`;

        project.tiles.forEach(data => {
            const tile = document.createElement("img");
            const url = URL.createObjectURL(data.blob);
            tile.src = url;
            tile.style.position = "absolute";
            tile.style.width = `${project.tileWidth}px`;
            tile.style.height = `${project.tileHeight}px`;
            tile.style.left = `${data.x}px`;
            tile.style.top = `${data.y}px`;

            this.mapContainer.appendChild(tile);
        });
    }
}