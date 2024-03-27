import {Entity, Id} from "@type";

export type Marker = Entity & {
    type: "marker";
    x: number;
    y: number;
    sourceId: Id;

    text: string;
    graphicIds: Id[];
};