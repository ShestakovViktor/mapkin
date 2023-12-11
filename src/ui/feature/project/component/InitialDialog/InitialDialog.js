import styles from "./InitialDialog.module.scss";
import en from "./string/en.json";

import {CreateProjectDialog} from "@ui/feature/project/component/CreateProjectDialog";
import {useContext} from "@ui/context";
import i18next from "i18next";

i18next.addResourceBundle("en", "project", {InitialDialog: en}, true, true);

export function InitialDialog() {
    const context = useContext();

    const initialDialog = document.createElement("div");
    initialDialog.classList.add(styles.InitialDialog);


    /**
     * Create project button
     */
    const createProjectButton = document.createElement("div");
    createProjectButton.innerText = i18next.t(
        "project:InitialDialog.create",
        {postProcess: ["capitalize"]}
    );
    createProjectButton.onclick = () => {
        context.modal.render(CreateProjectDialog());
    };

    /**
     * Continue project button
     */

    const continueProjectButton = document.createElement("div");
    continueProjectButton.innerText = i18next.t(
        "project:InitialDialog.continue"
    );
    continueProjectButton.onclick = () => {
        context.core.testProject();
        context.modal.hide();
    };

    /**
     * Load project button
     */
    const loadProjectButton = document.createElement("div");
    loadProjectButton.innerText = i18next.t(
        "project:InitialDialog.load"
    );


    initialDialog.appendChild(createProjectButton);
    initialDialog.appendChild(continueProjectButton);
    return initialDialog;
}