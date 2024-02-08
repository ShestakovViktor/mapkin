import {Entity} from "./Entity";

export type Group = Entity & {
    type: "group";
    name: string;
};
