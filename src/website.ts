import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Project} from "@project";
//import {Viewer} from "@src/trash/viewer";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

const data = JSON.parse(json);
const project = new Project(data);
//const viewer = new Viewer(root, project);

//viewer.render();
