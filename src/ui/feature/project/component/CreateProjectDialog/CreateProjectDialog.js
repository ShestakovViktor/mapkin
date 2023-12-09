import styles from "./CreateProjectDialog.module.scss";
import en from "./string/en.json";
import {UploadResourceForm} from ".";

import i18next from "i18next";

i18next.addResourceBundle("en", "project", {CreateProjectDialog: en}, true, true);

export function CreateProjectDialog() {
    const dialog = document.createElement("div");
    dialog.classList.add(styles.CreateProjectDialog);


    dialog.appendChild(UploadResourceForm());

    return dialog;
}