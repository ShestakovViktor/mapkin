export class Map {
    /**
     * @param {HTMLElement} root
     */
    constructor(root) {
        const map = document.createElement("div");
        map.id = "map";
        root.appendChild(map);

        const overlay = document.createElement("div");
        overlay.id = "overlay";
        root.appendChild(overlay);
    }
}