import styles from "./ProjectCreateDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {Dialog, Form, Row} from "@ui/widget";
import {useEditorContext} from "@ui/editor/context";
import {JSXElement} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";
import {Project} from "@project";

i18next.addResourceBundle(
    "en",
    "project",
    {CreateProjectDialog: en},
    true,
    true
);

type Props = {
    onComplete: () => void;
};

export function ProjectCreateDialog(props: Props): JSXElement {
    const context = useViewerContext();

    function handleSubmit(event: SubmitEvent): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        form.reset();

        const mapFile = formData.get("mapFile") as File;

        const projectName = String(
            formData.get("projectName")
        ) || "New project";

        const verticalTilesNumber = Number(
            formData.get("verticalTilesNumber")
        ) || 1;

        const horizontalTilesNumber = Number(
            formData.get("horizontalTilesNumber")
        ) || 1;

        const projectData = {
            projectName,
            mapFile,
            horizontalTilesNumber,
            verticalTilesNumber,
        };

        const project = new Project();
        project.initProject(projectData)
            .then(() => context.setProject(project))
            .then(() => context.reRender())
            .catch(error => console.log(error));

        props.onComplete();
    }

    return (
        <Dialog
            class={styles.CreateProjectSection}
            onClose={props.onComplete}
        >
            <Form onSubmit={handleSubmit} class={styles.ResourceForm}>
                <Row>
                    <label for="projectName">
                        {i18next.t(
                            "project:CreateProjectDialog.projectName",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        value="New project"
                        name="projectName"
                    />
                </Row>
                <input
                    type="file"
                    name="mapFile"
                    accept="image/*"
                />
                <Row>
                    <label for={"horizontalTilesNumber"} >
                        {i18next.t(
                            "project:CreateProjectDialog.horizontalTilesNumber",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <input
                        type="text"
                        id="horizontalTilesNumber"
                        name="horizontalTilesNumber"
                        value="5"
                    />
                </Row>

                <Row>
                    <label for="verticalTilesNumber">
                        {i18next.t(
                            "project:CreateProjectDialog.verticalTilesNumber",
                            {postProcess: ["capitalize"]}
                        )}
                    </label>
                    <input
                        type="text"
                        id="verticalTilesNumber"
                        name="verticalTilesNumber"
                        value="5"
                    />
                </Row>

                <input
                    type="submit"
                    value={i18next.t(
                        "project:CreateProjectDialog.create",
                        {postProcess: ["capitalize"]}
                    )}
                />
            </Form>
        </Dialog>
    );
}