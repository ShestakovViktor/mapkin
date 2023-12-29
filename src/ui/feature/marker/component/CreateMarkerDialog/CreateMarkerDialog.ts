import styles from "./CreateMarkerDialog.module.scss";
import {Dialog, Label, Form, TextArea, Input} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";

i18next.addResourceBundle("en", "marker", {CreateMarkerDialog: en}, true, true);

type Props = {
    onSubmit: (event: SubmitEvent) => void;
}

export function CreateMarkerDialog(props: Props): HTMLDivElement {
    return Dialog({
        class: styles.CreateMarkerDialog,
        children: [
            Form({
                onSubmit: props.onSubmit,
                class: styles.MarkerForm,
                children: [
                    Label({
                        htmlFor: "markerText",
                        innerText: i18next.t(
                            "marker:CreateMarkerDialog.text",
                            {postProcess: ["capitalize"]}
                        ) + ":",
                    }),

                    TextArea({
                        id: "markerText",
                        name: "markerText",
                        value: "Test",
                    }),

                    Input({
                        type: "submit",
                        name: "resolve",
                        value: i18next.t(
                            "marker:CreateMarkerDialog.createMarker",
                            {postProcess: ["capitalize"]}
                        ),
                    }),
                    Input({
                        type: "submit",
                        name: "reject",
                        value: i18next.t(
                            "marker:CreateMarkerDialog.cancel",
                            {postProcess: ["capitalize"]}
                        ),
                    }),
                ],
            }),
        ],
    });
}