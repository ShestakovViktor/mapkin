import {JSXElement, createSignal} from "solid-js";
import {EditorContext} from "@ui/editor/context";
import {Core} from "@core";
import {Project} from "@project";
import {Mode} from "@ui/editor/utility";

type Props = {
    value: {
        project: Project;
        core: Core;
    };
    children: JSXElement | JSXElement[];
};

export function EditorProvider(props: Props): JSXElement {
    const [project, setProject] = createSignal(
        props.value.project,
        {equals: false}
    );

    props.value.project.onRender(() => {
        setProject(project());
    });

    const [mode, setMode] = createSignal(new Mode());

    const value = {...props.value, project, mode, setMode};

    return (
        <EditorContext.Provider value={value}>
            {props.children}
        </EditorContext.Provider>
    );
}