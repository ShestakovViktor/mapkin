import {Entity, Asset} from "@type";

export type Data = {
    name: string;
    size: {width: number; height: number};
    grid: {rows: number; cols: number};
    source: {[key: string]: string};
    layout: {[key: string]: Entity};
    asset: {[key: string]: Asset};
};