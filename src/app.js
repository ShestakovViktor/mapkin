import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Engine} from "@src/engine";
import {Core} from "@src/core";
import {UI} from "@src/ui";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);


const engine = new Engine(root);
const core = new Core(engine);
const ui = new UI(root, core);

if (engine && core && ui) {
    console.log("App started");
}
