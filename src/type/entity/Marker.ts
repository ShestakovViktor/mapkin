import {Entity} from "@type";

export type Marker = Entity & {
    type: "marker";
    text: string;
    x: number;
    y: number;
    sourceId: string;
};