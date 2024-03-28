import {Entity, Asset, Motion, Id} from "@type";

export type Data = {
    name: string;
    size: {width: number; height: number};
    grid: {rows: number; cols: number};
    source: {[key: Id]: string};
    asset: {[key: Id]: Asset};
    motion: {[key: Id]: Motion};
    entity: {[key: Id]: Entity};
};