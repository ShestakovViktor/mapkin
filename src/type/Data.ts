import {Node, Entity, Asset} from "@type";

export type Data = {
    name: string;
    size: {width: number; height: number};
    grid: {rows: number; cols: number};
    source: {[key: string]: string};
    entity: {[key: string]: Entity};
    asset: {[key: string]: Asset};
    layout: Node | undefined;
};