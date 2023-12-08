import {useContext} from "@src/ui/context";
import styles from "./CreateProjectDialog.module.scss";

import i18next from "i18next";


export function UploadResourceForm() {
    const context = useContext();

    const resourceForm = document.createElement("form");
    resourceForm.classList.add(styles.ResourceForm);
    resourceForm.addEventListener("submit", handleSubmit);




    /** @param {SubmitEvent} event */
    function handleSubmit(event) {
        event.preventDefault();

        const form = /** @type HTMLFormElement */(event.target);
        const formData = new FormData(form);


        const mapFile = /** @type File */(formData.get("mapFile"));
        if (mapFile && mapFile.size) {context.core.createProject(
            /** @type string */(formData.get("projectName")) || "New project",
            mapFile
        );}

        context.modal.clear();
    }


    const projectNameLabel = document.createElement("label");
    projectNameLabel.htmlFor = "projectName";
    projectNameLabel.innerText = i18next.t(
        "project:CreateProjectDialog.projectName",
        {postProcess: ["capitalize"]}
    );


    const projectNameInput = document.createElement("input");
    projectNameInput.id = "projectName";
    projectNameInput.type = "text";
    projectNameInput.name = "projectName";


    const mapFileInput = document.createElement("input");
    mapFileInput.type = "file";
    mapFileInput.name = "mapFile";


    const submitButton = document.createElement("input");
    submitButton.type = "submit";



    resourceForm.appendChild(projectNameLabel);
    resourceForm.appendChild(projectNameInput);
    resourceForm.appendChild(mapFileInput);
    resourceForm.appendChild(submitButton);



    return resourceForm;
}