import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Core} from "@core";
import {Project} from "@project";
import {render} from "solid-js/web";
import {
    ViewerProvider,
    EditorProvider,
} from "@src/ui/context";
import {Map} from "@src/ui/map/widget";
import {Editor} from "./ui/editor/widget";

const root = document.querySelector("#root");
if (!root) throw new Error("There is no root");

const project = new Project();
const core = new Core();

render(() => {
    return (
        <>
            <ViewerProvider value={{project}}>
                <Map/>
            </ViewerProvider>
            <EditorProvider value={{project, core}}>
                <Editor/>
            </EditorProvider>
        </>
    );
}, root);

fetch("/project.mp")
    .then((response) => response.blob())
    .then(file => project.import(file))
    .then(() => project.render())
    .catch(err => {throw new Error("Project init error: " + err);});
