import CursorIconSvg from "@public/icon/cursor.svg";
import en from "./string/en.json";

import {Button} from "@ui/widget";
import i18next from "i18next";
import {useEditorContext} from "@src/ui/context";
import {JSXElement} from "solid-js";

i18next.addResourceBundle("en", "layout", {SystemBar: en}, true, true);

export function SelectModeButton(): JSXElement {
    const context = useEditorContext();

    return (
        <Button
            icon={CursorIconSvg}
            tooltip= {i18next.t(
                "layout:ToolBar.markerMode",
                {postProcess: ["capitalize"]}
            )}

            onClick={(): void => {
                //context.input.setMode("select");
            }}
        />
    );
}