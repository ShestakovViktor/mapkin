import {Element} from "@type";

export type Tile = Element & {
    type: "tile";
    width: number;
    height: number;
};
