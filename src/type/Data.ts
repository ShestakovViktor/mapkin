import {Node, Entity} from "@type";

export type Data = {
    name: string;
    size: {width: number; height: number};
    grid: {rows: number; cols: number};
    layout: Node;
    entity: {[key: string]: Entity};
    assets: {[key: string]: string};
};