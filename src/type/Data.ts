import {Marker} from "./Marker";
import {Tile} from "./Tile";

export type Data = {
   name: string;
   size: {width: number; height: number};
   grid: {rows: number; cols: number};
   layout: {
       tiles: Tile[];
       markers: Marker[];
   };
}