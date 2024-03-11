import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Project} from "@project";
import {render} from "solid-js/web";
import {ViewerProvider} from "@ui/viewer/context";
import {Viewer} from "@src/ui/viewer/widget";

const root = document.querySelector("#root");
if (!root) throw new Error("There is no root");

const project = new Project();
project.init(JSON.parse(qwerty));

render(() => {
    return (
        <ViewerProvider project={project}>
            <Viewer/>
        </ViewerProvider>
    );
}, root);