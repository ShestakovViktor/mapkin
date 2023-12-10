import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Engine} from "@engine";
import {Core} from "@core";
import {UI} from "@ui";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);


const engine = new Engine(root);
const core = new Core(engine);
const ui = new UI(root, core);

if (engine && core && ui) {
    console.log("App started");
}
