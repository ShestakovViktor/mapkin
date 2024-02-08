import gsap from "gsap";

import {Pivot} from "@viewer";
import {
    Tile as TileComp,
    Marker as MarkerComp,
} from "@viewer/component";
import {
    Tile as TileData,
    Marker as MarkerData,
    Entity,
    Node,
} from "@src/type";
import {Project} from "@core";

export class Visualiser {

    constructor(
        private map: HTMLElement,
        private pivot: Pivot,
        private project: Project
    ) {
        this.setupContainer();
        this.setupTicker();
    }

    private setupContainer(): void {
        const data = this.project.getData();
        this.map.style.width = `${data.size.width}px`;
        this.map.style.height = `${data.size.height}px`;
    }

    private setupTicker(): void {
        const setScaleX = gsap.quickSetter(this.map, "scaleX");
        const setScaleY = gsap.quickSetter(this.map, "scaleY");

        const setPositionX = gsap.quickSetter(this.map, "x", "px");
        const setPositionY = gsap.quickSetter(this.map, "y", "px");

        gsap.ticker.add(() => {
            const x = this.pivot.getX();
            setPositionX(x);

            const y = this.pivot.getY();
            setPositionY(y);

            const scale = this.pivot.getScale();
            setScaleX(scale);
            setScaleY(scale);
        });
    }

    render(): void {
        const rootNode = this.project.getData().layout;
        if (!rootNode) throw new Error();
        this.renderNode(rootNode);
    }

    private renderNode(node: Node): void {
        const data = this.project.getData();
        const entity = data.entity[node.id];

        if (this.isTile(entity)) this.renderTile(entity);
        else if (this.isMarker(entity)) this.renderMarker(entity);
        else if (node.childs) {
            node.childs.forEach(child => this.renderNode(child));
        }
    }

    private isMarker(pet: Entity): pet is MarkerData {
        return pet.type == "marker";
    }

    private renderMarker(markerData: MarkerData): HTMLImageElement {
        const tileElement = MarkerComp({
            x: markerData.x,
            y: markerData.y,
            text: markerData.text,
            src: this.project.getSource(markerData.sourceId),
        });

        this.map.appendChild(tileElement);

        return tileElement;
    }

    private isTile(pet: Entity): pet is TileData {
        return pet.type == "tile";
    }

    private renderTile(tileData: TileData): HTMLImageElement {
        const tileElement = TileComp({
            x: tileData.x,
            y: tileData.y,
            width: tileData.width,
            height: tileData.height,
            src: this.project.getSource(tileData.sourceId),
        });

        this.map.appendChild(tileElement);

        return tileElement;
    }
}