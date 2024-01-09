import {Entity} from "./Entity";

export type Group = Entity & {
    childs: Entity[];
};
