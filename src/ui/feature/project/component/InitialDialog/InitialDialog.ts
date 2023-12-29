import styles from "./InitialDialog.module.scss";
import en from "./string/en.json";

import {CreateProjectDialog} from "@ui/feature/project/component";

import {Button, Dialog} from "@ui/widget";
import {useContext} from "@ui/context";

import i18next from "i18next";

i18next.addResourceBundle("en", "project", {InitialDialog: en}, true, true);

export function InitialDialog(): HTMLDivElement {
    const context = useContext();

    function handleProjectCreation(): void {
        context.modal.show(CreateProjectDialog());
    }

    function handleProjectUpload(): void {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".mp";
        input.click();
        input.addEventListener("change", (): void => {
            if (!input.files?.length) return;
            const file = input.files[0];

            context.core.importProject(file).catch(error => console.log(error));
        });

        context.modal.hide();
    }

    return Dialog({
        class: styles.InitialDialog,
        children: [
            Button({
                label: i18next.t(
                    "project:InitialDialog.create",
                    {postProcess: ["capitalize"]}
                ),
                onClick: handleProjectCreation,
            }),
            Button({
                label: i18next.t(
                    "project:InitialDialog.continue",
                    {postProcess: ["capitalize"]}
                ),
                onClick: handleProjectUpload,
            }),
        ],
    });
}