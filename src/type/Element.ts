import {Entity} from "./Entity";

export type Element = Entity & {
    x: number;
    y: number;
    source: string;
};