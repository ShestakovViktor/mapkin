import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Engine} from "@engine";
import {Project} from "@core";

(async () => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);


    const response = await fetch("./project.mp");
    const projectFile = await response.blob();




    const project = new Project();
    await project.converter.import(new File([projectFile], "project.md"));


    const engine = new Engine(root);
    engine.render(project);

})();
