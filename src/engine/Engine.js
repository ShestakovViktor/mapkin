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

    /** @param {import("@core").Project} project */
    render(project) {
        this.mapContainer.style.width = `${project.props.size.width}px`;
        this.mapContainer.style.height = `${project.props.size.height}px`;

        const initialWidthScale
            = window.innerWidth / project.props.size.width;
        const initialHeightScale
            = window.innerHeight / project.props.size.height;
        this.mapContainer.style.transform
            = `scale(${initialWidthScale}, ${initialHeightScale})`;

        project.layout.forEach(data => {
            const tile = document.createElement("img");
            const url = URL.createObjectURL(project.tiles[data.tile]);
            tile.src = url;
            tile.style.position = "absolute";
            tile.style.width = `${project.props.tile.width}px`;
            tile.style.height = `${project.props.tile.height}px`;
            tile.style.left = `${data.x}px`;
            tile.style.top = `${data.y}px`;

            this.mapContainer.appendChild(tile);
        });
    }


    /** @param {import("@type").Data} project */
    renderFoo(project) {
        this.mapContainer.style.width = `${project.props.size.width}px`;
        this.mapContainer.style.height = `${project.props.size.height}px`;

        const initialWidthScale
            = window.innerWidth / project.props.size.width;
        const initialHeightScale
            = window.innerHeight / project.props.size.height;
        this.mapContainer.style.transform
            = `scale(${initialWidthScale}, ${initialHeightScale})`;

        project.layout.forEach(data => {
            const tile = document.createElement("img");
            tile.src = `./tiles/${data.tile}.jpg`;
            tile.style.position = "absolute";
            tile.style.width = `${project.props.tile.width}px`;
            tile.style.height = `${project.props.tile.height}px`;
            tile.style.left = `${data.x}px`;
            tile.style.top = `${data.y}px`;

            this.mapContainer.appendChild(tile);
        });
    }
}