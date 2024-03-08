import {JSXElement, createSignal} from "solid-js";
import {ViewerContext} from "@ui/viewer/context";
import {Project} from "@src/project";
import {createStore} from "solid-js/store";
import {Brect} from "@type";

type Props = {
    value: {
        project: Project;
    };
    children: JSXElement | JSXElement[];
};

export function ViewerProvider(props: Props): JSXElement {
    const [project, setProject] = createSignal(
        props.value.project,
        {equals: false}
    );

    props.value.project.onRender(() => {
        setProject(project());
    });

    const [brect, setBrect] = createStore<Brect>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        scale: 1,
    });

    return (
        <ViewerContext.Provider value={{project, brect, setBrect}}>
            {props.children}
        </ViewerContext.Provider>
    );
}