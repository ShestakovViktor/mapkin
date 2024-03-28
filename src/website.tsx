import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {render} from "solid-js/web";
import {ViewerProvider} from "@ui/viewer/context";
import {Viewer} from "@src/ui/viewer/widget";
import {Store} from "@store";

const root = document.querySelector("#root");
if (!root) throw new Error("There is no root");

const data = JSON.parse(qwerty);
const store = new Store(data);

render(() => {
    return (
        <ViewerProvider store={store}>
            <Viewer/>
        </ViewerProvider>
    );
}, root);