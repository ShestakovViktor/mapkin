import {Element} from "@type";

export type Marker = Element & {
    type: "marker";
    text: string;
};