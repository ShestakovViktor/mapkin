import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Viewer} from "@src/viewer";

(async () => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    const viewer = new Viewer(root, {mode: "website"});
    viewer.init(JSON.parse(project));
    viewer.render();
})();
