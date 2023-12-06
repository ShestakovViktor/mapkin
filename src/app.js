import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Map} from "@src/map";
import {Core} from "@core";
import {UI} from "@ui";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);


const map = new Map(root);
const core = new Core(map);
const ui = new UI(root, core);

if (map && core && ui) {
    console.log("App started");
}
