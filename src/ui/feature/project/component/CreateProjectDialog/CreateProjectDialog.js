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


export function CreateProjectDialog() {
    const context = useContext();


    /** @param {SubmitEvent} event */
    function handleSubmit(event) {
        event.preventDefault();

        const form = /** @type {HTMLFormElement} */(event.target);
        const formData = new FormData(form);


        const mapFile = /** @type {File} */(formData.get("mapFile"));


        const projectName = /** @type {string} */(
            String(formData.get("projectName"))
        ) || "New project";

        const verticalTilesNumber = /** @type {number} */(
            Number(formData.get("verticalTilesNumber"))
        ) || 1;

        const horizontalTilesNumber = /** @type {number} */(
            Number(formData.get("horizontalTilesNumber"))
        ) || 1;


        const projectData = {
            projectName,
            mapFile,
            horizontalTilesNumber,
            verticalTilesNumber,
        };

        context.core.initProject(projectData);

        context.modal.hide();
    }


    return Dialog({
        class: styles.CreateProjectDialog,
        children: [
            Form({
                submit: handleSubmit,
                class: styles.ResourceForm,
                children: [
                    Label({
                        htmlFor: "projectName",
                        innerText: i18next.t(
                            "project:CreateProjectDialog.projectName",
                            {postProcess: ["capitalize"]}
                        )
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
                        ) + ":"
                    }),
                    Input({
                        type: "text",
                        id: "verticalTilesNumber",
                        name: "verticalTilesNumber",
                        value: "5",
                    }),


                    Input({type: "submit"})
                ]
            })
        ]
    });
}