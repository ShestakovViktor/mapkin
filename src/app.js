import "@src/i18n";
import {Scene} from "@scene";
import {Core} from "@core";
import {UI} from "@ui";


const root = document.body;

const scene = new Scene(root);
const core = new Core(scene);
const ui = new UI(root, core);

if (scene && core && ui) {
    console.log("App started");
}
