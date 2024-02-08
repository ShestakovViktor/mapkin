import {Entity} from "@type";

export type Tile = Entity & {
    type: "tile";
    x: number;
    y: number;
    width: number;
    height: number;
    sourceId: string;
};
