import styles from "./ProjectCreateDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {Dialog, Form, Row} from "@ui/widget";
import {JSX} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";
import {useEditorContext} from "@ui/editor/context";

i18next
    .addResourceBundle("en", "project", {CreateProjectDialog: en}, true, true);

type Props = {
    onComplete: () => void;
};

export function ProjectCreateDialog(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    const viewerCtx = useViewerContext();

    function projectCreate(event: SubmitEvent): void {
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

        const storeData = {
            projectName,
            mapFile,
            horizontalTilesNumber,
            verticalTilesNumber,
        };

        editorCtx.core.initProject(storeData)
            .then(() => viewerCtx.reInit())
            .then(() => viewerCtx.reRender())
            .catch(error => {throw new Error(error);});

        props.onComplete();
    }

    return (
        <Dialog
            class={styles.ProjectCreateDialog}
            onClose={props.onComplete}
        >
            <Form class={styles.ResourceForm} onSubmit={projectCreate}>
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