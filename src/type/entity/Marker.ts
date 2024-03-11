import {Entity} from "@type";

export type Marker = Entity & {
    type: "marker";
    x: number;
    y: number;
    sourceId: string;

    text: string;
};