import {JSXElement, createSignal} from "solid-js";
import {EditorContext} from "@src/ui/context";
import {Core} from "@core";
import {Project} from "@project";

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

    return (
        <EditorContext.Provider value={{foo: project, ...props.value}}>
            {props.children}
        </EditorContext.Provider>
    );
}