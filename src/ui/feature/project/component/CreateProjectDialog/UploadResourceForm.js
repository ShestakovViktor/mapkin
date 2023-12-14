import {useContext} from "@ui/context";
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


        const projectName = /** @type string */(
            String(formData.get("projectName"))
        ) || "New project";

        const verticalTilesNumber = /** @type number */(
            Number(formData.get("verticalTilesNumber"))
        ) || 1;

        const horizontalTilesNumber = /** @type number */(
            Number(formData.get("horizontalTilesNumber"))
        ) || 1;


        const projectData = {
            projectName,
            mapFile,
            horizontalTilesNumber,
            verticalTilesNumber,
        };

        context.core.newProject(projectData);

        context.modal.hide();
    }


    /**
     * Project name
     */
    const projectNameLabel = document.createElement("label");
    projectNameLabel.htmlFor = "projectName";
    projectNameLabel.innerText = i18next.t(
        "project:CreateProjectDialog.projectName",
        {postProcess: ["capitalize"]}
    );

    const projectNameInput = document.createElement("input");
    projectNameInput.value = "New project";
    projectNameInput.id = "projectName";
    projectNameInput.type = "text";
    projectNameInput.name = "projectName";


    /**
     * Map file
     */
    const mapFileInput = document.createElement("input");
    mapFileInput.type = "file";
    mapFileInput.accept = "image/*";
    mapFileInput.name = "mapFile";


    const submitButton = document.createElement("input");
    submitButton.type = "submit";


    /**
     * Horizontal tiles number
     */
    const horizontalTilesNumberLabel = document.createElement("label");
    horizontalTilesNumberLabel.htmlFor = "horizontalTilesNumber";
    horizontalTilesNumberLabel.innerText = i18next.t(
        "project:CreateProjectDialog.horizontalTilesNumber",
        {postProcess: ["capitalize"]}
    ) + ":";

    const horizontalTilesNumberInput = document.createElement("input");
    horizontalTilesNumberInput.id = "horizontalTilesNumber";
    horizontalTilesNumberInput.type = "text";
    horizontalTilesNumberInput.value = "5";
    horizontalTilesNumberInput.name = "horizontalTilesNumber";


    /**
     * Vertical tiles number
     */
    const verticalTilesNumberLabel = document.createElement("label");
    verticalTilesNumberLabel.htmlFor = "verticalTilesNumber";
    verticalTilesNumberLabel.innerText = i18next.t(
        "project:CreateProjectDialog.verticalTilesNumber",
        {postProcess: ["capitalize"]}
    ) + ":";

    const verticalTilesNumberInput = document.createElement("input");
    verticalTilesNumberInput.id = "verticalTilesNumber";
    verticalTilesNumberInput.type = "text";
    verticalTilesNumberInput.value = "5";
    verticalTilesNumberInput.name = "verticalTilesNumber";


    /**
     * Layout
     */
    resourceForm.appendChild(projectNameLabel);
    resourceForm.appendChild(projectNameInput);

    resourceForm.appendChild(mapFileInput);

    resourceForm.appendChild(horizontalTilesNumberLabel);
    resourceForm.appendChild(horizontalTilesNumberInput);

    resourceForm.appendChild(verticalTilesNumberLabel);
    resourceForm.appendChild(verticalTilesNumberInput);

    resourceForm.appendChild(submitButton);


    return resourceForm;
}