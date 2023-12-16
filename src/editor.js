import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Viewer} from "@src/viewer";
import {Core} from "@core";
import {UI} from "@ui";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);


const viewer = new Viewer(root, {mode: "editor"});
const core = new Core(viewer);
const ui = new UI(root, core);

if (viewer && core && ui) {
    console.log("App started");
}
