import {Data} from "@src/type";
import {Marker, Tile} from "@viewer/component";
import {Map, TileLayer, MarkerLayer, ModalLayer} from "@viewer/layout";
import gsap from "gsap";

export class Viewer {
    mode: "editor" | "website" | "";

    modalLayer: HTMLDivElement;
    tileLayer: HTMLDivElement;
    markerLayer: HTMLDivElement;

    factor: number;
    map: HTMLDivElement;

    data: Data | undefined;
    assets: {[key: string]: Blob} | undefined;

    constructor(root: HTMLElement, props: {mode: "editor" | "website"}) {

        /** @type {"editor" | "website"} */
        this.mode = props.mode;

        this.modalLayer = ModalLayer();
        this.tileLayer = TileLayer();
        this.markerLayer = MarkerLayer();


        this.factor = 1;

        this.map = Map({
            children: [
                this.tileLayer,
                this.markerLayer,
                this.modalLayer,
            ],
        });

        const setScaleX = gsap.quickSetter(this.map, "scaleX");
        const setScaleY = gsap.quickSetter(this.map, "scaleY");
        const setScale = (val: number): void => {
            setScaleX(val);
            setScaleY(val);
        };

        this.map.addEventListener("wheel", (event) => {
            console.log("wheel");

            this.factor -= Math.sign(event.deltaY) * 0.1;
        });

        gsap.ticker.add(() => {
            setScale(this.factor);
        });

        root.appendChild(this.map);


        /** @type {import("@type").Data | undefined} */
        this.data = undefined;
    }

    init(data: Data, assets?: {[key: string]: Blob}): void {
        this.data = data;
        if (assets) this.assets = assets;
    }


    setupContainer(): void {
        if (!this.data) throw new Error();

        this.map.style.width = `${this.data.size.width}px`;
        this.map.style.height = `${this.data.size.height}px`;
    }

    getRelativeCoords(x: number, y: number): void {
        console.log(x, y);
    }


    render(): void {
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
                url = URL.createObjectURL(this.assets.marker);
            }
            else {
                throw new Error("Something going wrong");
            }

            const markerElement = Marker({
                x: markerData.x,
                y: markerData.y,
                text: markerData.text,
                src: url,
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
                src: url,
            });

            this.tileLayer.appendChild(tileElement);
        });
    }
}