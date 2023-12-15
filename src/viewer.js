import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Engine} from "@engine";

(async () => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    const engine = new Engine(root);
    engine.renderFoo(JSON.parse(project));
})();
