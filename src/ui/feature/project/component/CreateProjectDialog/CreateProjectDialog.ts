import styles from "./CreateProjectDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {Dialog, Form, Input, Label} from "@ui/widget";
import {useContext} from "@ui/context";

i18next.addResourceBundle(
    "en",
    "project",
    {CreateProjectDialog: en},
    true,
    true
);

export function CreateProjectDialog(): HTMLDivElement {
    const context = useContext();

    function handleSubmit(event: SubmitEvent): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const mapFile = formData.get("mapFile") as File;

        const projectName = String(
            formData.get("projectName")
        ) || "New project";

        const verticalTilesNumber = Number(
            formData.get("verticalTilesNumber")
        ) || 1;

        const horizontalTilesNumber = Number(
            formData.get("horizontalTilesNumber")
        ) || 1;

        const projectData = {
            projectName,
            mapFile,
            horizontalTilesNumber,
            verticalTilesNumber,
        };

        context.core.initProject(projectData)
            .catch(error => console.log(error));

        context.modal.hide();
    }

    return Dialog({
        class: styles.CreateProjectDialog,
        children: [
            Form({
                onSubmit: handleSubmit,
                class: styles.ResourceForm,
                children: [
                    Label({
                        htmlFor: "projectName",
                        innerText: i18next.t(
                            "project:CreateProjectDialog.projectName",
                            {postProcess: ["capitalize"]}
                        ),
                    }),
                    Input({
                        type: "text",
                        id: "projectName",
                        value: "New project",
                        name: "projectName",
                    }),

                    Input({
                        type: "file",
                        name: "mapFile",
                        accept: "image/*",
                    }),

                    Label({
                        htmlFor: "horizontalTilesNumber",
                        innerText: i18next.t(
                            "project:CreateProjectDialog.horizontalTilesNumber",
                            {postProcess: ["capitalize"]}
                        ) + ":",
                    }),
                    Input({
                        type: "text",
                        id: "horizontalTilesNumber",
                        name: "horizontalTilesNumber",
                        value: "5",
                    }),

                    Label({
                        htmlFor: "verticalTilesNumber",
                        innerText: i18next.t(
                            "project:CreateProjectDialog.verticalTilesNumber",
                            {postProcess: ["capitalize"]}
                        ) + ":",
                    }),
                    Input({
                        type: "text",
                        id: "verticalTilesNumber",
                        name: "verticalTilesNumber",
                        value: "5",
                    }),

                    Input({type: "submit"}),
                ],
            }),
        ],
    });
}