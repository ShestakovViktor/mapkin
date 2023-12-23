import {Dialog, Input, Label, Form} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";

i18next.addResourceBundle("en", "marker", {CreateMarkerDialog: en}, true, true);

export function CreateMarkerDialog() {
    return Dialog({
        children: [
            Form({
                children: [
                    Label({
                        htmlFor: "markerText",
                        innerText: i18next.t(
                            "marker:CreateMarkerDialog.text",
                            {postProcess: ["capitalize"]}
                        ) + ":",
                    }),

                    Input({
                        type: "text",
                        id: "markerText",
                        name: "markerText",
                        value: "5",
                    })
                ]
            })
        ]
    });
}