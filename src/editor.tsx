import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Core} from "@core";
import {Store} from "@store";
import {render} from "solid-js/web";
import {Viewer} from "@src/ui/viewer/widget";
import {ViewerProvider} from "@ui/viewer/context";
import {Editor} from "./ui/editor/widget";
import {EditorProvider} from "@ui/editor/context";

const app = document.querySelector("#app");
if (!app) throw new Error("There is no element with \"app\" id");

const store = new Store();
const core = new Core(store);

render(() => {
    return (
        <ViewerProvider store={store}>
            <Viewer/>
            <EditorProvider value={{core}}>
                <Editor/>
            </EditorProvider>
        </ViewerProvider>
    );
}, app);
