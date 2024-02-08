import styles from "./ProjectCreateDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {Dialog, Form, Input, Label, Row} from "@ui/widget";
import {useContext} from "@ui/context";

i18next.addResourceBundle(
    "en",
    "project",
    {CreateProjectDialog: en},
    true,
    true
);

export function ProjectCreateDialog(): HTMLDivElement {
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
    }

    return Dialog({
        class: styles.CreateProjectDialog,
        children: [
            Form({
                onSubmit: handleSubmit,
                class: styles.ResourceForm,
                children: [
                    Row({children: [
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
                    ]}),
                    Input({
                        type: "file",
                        name: "mapFile",
                        accept: "image/*",
                    }),

                    Row({children: [
                        Label({
                            htmlFor: "horizontalTilesNumber",
                            innerText: i18next.t(
                                "project:CreateProjectDialog.horizontalTilesNumber",
                                {postProcess: ["capitalize"]}
                            ),
                        }),
                        Input({
                            type: "text",
                            id: "horizontalTilesNumber",
                            name: "horizontalTilesNumber",
                            value: "5",
                        }),
                    ]}),

                    Row({children: [

                        Label({
                            htmlFor: "verticalTilesNumber",
                            innerText: i18next.t(
                                "project:CreateProjectDialog.verticalTilesNumber",
                                {postProcess: ["capitalize"]}
                            ),
                        }),
                        Input({
                            type: "text",
                            id: "verticalTilesNumber",
                            name: "verticalTilesNumber",
                            value: "5",
                        }),
                    ]}),

                    Input({
                        type: "submit",
                        value: i18next.t(
                            "project:CreateProjectDialog.create",
                            {postProcess: ["capitalize"]}
                        ),
                    }),
                ],
            }),
        ],
    });
}