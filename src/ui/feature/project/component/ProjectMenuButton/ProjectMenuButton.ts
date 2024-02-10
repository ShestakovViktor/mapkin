import GearIconSvg from "@public/icon/gear.svg";
import en from "./string/en.json";

import {Button} from "@ui/widget";
import i18next from "i18next";
import {useContext} from "@ui/context";
import {ProjectMenu} from "@ui/feature/project/component";

i18next.addResourceBundle("en", "layout", {SystemBar: en}, true, true);

export function ProjectMenuButton(): HTMLButtonElement {
    const context = useContext();

    return Button({
        icon: GearIconSvg,
        tooltip: i18next.t(
            "layout:SystemBar.projectSettings",
            {postProcess: ["capitalize"]}
        ),
        onClick: (): void => {
            context.modal.show(ProjectMenu());
        },
    });
}