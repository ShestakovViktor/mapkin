import styles from "./InitialDialog.module.scss";
import en from "./string/en.json";

import {ProjectCreateDialog} from "@src/ui/project/widget";

import {Button, Dialog} from "@ui/widget";

import i18next from "i18next";
import {JSXElement} from "solid-js";
import {Modal} from "@ui/widget/Modal";
import {useViewerContext} from "@ui/viewer/context";
import {Project} from "@project";

i18next.addResourceBundle("en", "project", {InitialDialog: en}, true, true);

type Props = {
    onComplete: () => void;
};

export function InitialDialog(props: Props): JSXElement {
    const context = useViewerContext();

    function handleProjectUpload(): void {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".mp";
        input.click();
        input.addEventListener("change", (): void => {
            if (!input.files?.length) return;
            const file = input.files[0];

            const project = new Project();
            project.import(file)
                .then(() => {
                    context.setProject(project);
                    context.reRender();
                })
                .catch(error => console.log(error));
            props.onComplete();
        });
    }

    const projectCreateModal = new Modal("#modal");
    projectCreateModal.render(
        <ProjectCreateDialog
            onComplete={() => {
                props.onComplete();
                projectCreateModal.hide();
            }}
        />
    );

    return (
        <Dialog
            class={styles.InitialDialog}
            title={i18next.t(
                "project:InitialDialog.dialogTitle",
                {postProcess: ["capitalize"]}
            )}
            onClose={props.onComplete}
        >
            <Button
                label={i18next.t(
                    "project:InitialDialog.create",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => projectCreateModal.show()}
            />

            <Button
                label={i18next.t(
                    "project:InitialDialog.continue",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => handleProjectUpload()}
            />
        </Dialog>
    );
}