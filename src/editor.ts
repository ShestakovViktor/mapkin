import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Viewer} from "@viewer";
import {Core} from "@core";
import {UI} from "@ui";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

const viewer = new Viewer(root);
const core = new Core(viewer);
const ui = new UI(root, viewer, core);

// fetch("/project.mp")
//     .then((response) => response.blob())
//     .then(file => core.importProject(file))
//     .catch(err => {throw new Error("Project init error: " + err);});
ui.showInitialDialog();

