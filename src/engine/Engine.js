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
        this.mapContainer.style.width = `${project.map.width}px`;
        this.mapContainer.style.height = `${project.map.height}px`;

        project.tiles.forEach(data => {
            const tile = document.createElement("img");
            const url = URL.createObjectURL(data.blob);
            tile.src = url;
            tile.style.position = "absolute";
            tile.style.width = `${project.map.tile.width}px`;
            tile.style.height = `${project.map.tile.height}px`;
            tile.style.left = `${data.x}px`;
            tile.style.top = `${data.y}px`;

            this.mapContainer.appendChild(tile);
        });
    }
}