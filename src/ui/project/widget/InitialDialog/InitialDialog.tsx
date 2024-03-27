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
    const viewerCtx = useViewerContext();

    function loadTestProject(): void {
        fetch("/project.mp")
            .then(async (resp) => resp.blob())
            .then(async (blob) => {
                const project = new Project();
                await project.import(blob);
                viewerCtx.setProject(project);
                viewerCtx.reRender();
                props.onComplete();
            })
            .catch((err) => {throw err;});
    }

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
                    viewerCtx.setProject(project);
                    viewerCtx.reRender();
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

            <Button
                label={i18next.t(
                    "project:InitialDialog.demo",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => loadTestProject()}
            />
        </Dialog>
    );
}