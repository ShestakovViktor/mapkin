import styles from "./InitialDialog.module.scss";
import en from "./string/en.json";

import {CreateProjectDialog} from "@ui/feature/project/component/CreateProjectDialog";
import {useContext} from "@ui/context";
import i18next from "i18next";

i18next.addResourceBundle("en", "project", {InitialDialog: en}, true, true);

export function InitialDialog() {
    const context = useContext();

    function handleProjectCreation() {
        context.modal.render(CreateProjectDialog());
    }

    function handleProjectUpload() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".mp";
        input.click();
        input.addEventListener("change", async () => {
            if (!input.files?.length) return;
            const file = input.files[0];

            context.core.importProject(file);
        });

        context.modal.hide();
    }

    const initialDialog = document.createElement("div");
    initialDialog.classList.add(styles.InitialDialog);

    [
        {
            label: i18next.t(
                "project:InitialDialog.create",
                {postProcess: ["capitalize"]}
            ),
            onClick: handleProjectCreation,
        },
        {
            label: i18next.t(
                "project:InitialDialog.continue",
                {postProcess: ["capitalize"]}
            ),
            onClick: handleProjectUpload,
        }
    ].forEach((data) => {
        const button = document.createElement("div");
        button.innerText = data.label;
        button.addEventListener("click", data.onClick);
        initialDialog.appendChild(button);
    });

    return initialDialog;
}