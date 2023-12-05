import styles from "./InitialDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";

i18next.addResourceBundle("en", "project", {InitialDialog: en}, true, true);

/**
 * @param {import("@core").Core} core
 */
export function InitialDialog(core) {
    const initialDialog = document.createElement("div");
    initialDialog.classList.add(styles.InitialDialog);


    const createProjectButton = document.createElement("div");
    createProjectButton.innerText = i18next
        .t("project:InitialDialog.create");
    createProjectButton.onclick = () => {
        core.signal();
    };

    const continueProjectButton = document.createElement("div");
    continueProjectButton.innerText = i18next
        .t("project:InitialDialog.continue");

    const loadProjectButton = document.createElement("div");
    loadProjectButton.innerText = i18next
        .t("project:InitialDialog.load");


    initialDialog.appendChild(createProjectButton);
    return initialDialog;
}