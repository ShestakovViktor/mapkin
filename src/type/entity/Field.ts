import {Entity} from "@type";

export type Field = Entity & {
    type: "field";
    x: number;
    y: number;
};