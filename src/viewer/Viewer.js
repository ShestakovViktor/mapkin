import {Marker, Tile} from "@viewer/component";
import {Map, TileLayer, MarkerLayer} from "@viewer/layout";

export class Viewer {

    /**
     * @param {HTMLElement} root
     * @param {{mode: "editor" | "website"}} props
     */
    constructor(root, props) {

        /** @type {"editor" | "website"} */
        this.mode = props.mode;

        this.map = Map();
        root.appendChild(this.map);

        this.tileLayer = TileLayer();
        this.map.appendChild(this.tileLayer);

        this.markerLayer = MarkerLayer();
        this.map.appendChild(this.markerLayer);


        /** @type {import("@type").Data | undefined} */
        this.data = undefined;
    }

    /**
     * @param {import("@type").Data} data
     * @param {{[key: string]: Blob}} [assets]
     */
    init(data, assets) {
        this.data = data;
        if (assets) this.assets = assets;
    }


    setupContainer() {
        if (!this.data) throw new Error();

        this.map.style.width = `${this.data.size.width}px`;
        this.map.style.height = `${this.data.size.height}px`;

        // const initialWidthScale
        //     = window.innerWidth / this.data.size.width;
        // const initialHeightScale
        //     = window.innerHeight / this.data.size.height;

        // this.map.style.transform
        //     = `scale(${initialWidthScale}, ${initialHeightScale})`;
    }


    /**
     * @param {number} x
     * @param {number} y
     */
    getRelativeCoords(x, y) {
        console.log(x, y);
    }


    render() {
        if (!this.data) {
            throw new Error("no project data");
        }

        this.setupContainer();


        this.data.layout.markers.forEach(markerData => {
            let url;

            if (this.mode == "website") {
                url = "./static/marker.svg";
            }
            else if (this.mode == "editor" && this.assets) {
                url = URL.createObjectURL(this.assets["marker"]);
            }
            else {
                throw new Error("Something going wrong");
            }

            const markerElement = Marker({
                x: markerData.x,
                y: markerData.y,
                text: markerData.text,
                src: url
            });
            this.markerLayer.appendChild(markerElement);
        });

        this.data.layout.tiles.forEach(tileData => {
            let url;

            if (this.mode == "website") {
                url = `./static/${tileData.asset}.png`;
            }
            else if (this.mode == "editor" && this.assets) {
                url = URL.createObjectURL(this.assets[tileData.asset]);
            }
            else {
                throw new Error("Something going wrong");
            }

            const tileElement = Tile({
                x: tileData.x,
                y: tileData.y,
                width: tileData.width,
                height: tileData.height,
                src: url
            });

            this.tileLayer.appendChild(tileElement);
        });
    }
}