import styles from "./InitialDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";

i18next.addResourceBundle("en", "project", {InitialDialog: en}, true, true);


export function InitialDialog() {
    const initialDialog = document.createElement("div");
    initialDialog.classList.add(styles.InitialDialog);


    const createProjectButton = document.createElement("div");
    createProjectButton.innerText = i18next
        .t("project:InitialDialog.create");
    createProjectButton.onclick = () => {
        console.log("qwe");
    };

    const continueProjectButton = document.createElement("div");
    continueProjectButton.innerText = i18next
        .t("project:InitialDialog.continue");
    continueProjectButton.onclick = () => {
        console.log("qwe");
    };

    const loadProjectButton = document.createElement("div");
    loadProjectButton.innerText = i18next.t("project:InitialDialog.load");
    loadProjectButton.onclick = () => {
        console.log("qwe");
    };


    initialDialog.appendChild(createProjectButton);
    initialDialog.appendChild(continueProjectButton);
    initialDialog.appendChild(loadProjectButton);
    return initialDialog;
}