import {JSXElement} from "solid-js";
import {ViewerContext} from "@src/ui/context";
import {Project} from "@src/project";

type Props = {
    value: {
        project: Project;
    };
    children: JSXElement | JSXElement[];
};

export function ViewerProvider(props: Props): JSXElement {
    return (
        <ViewerContext.Provider value={props.value}>
            {props.children}
        </ViewerContext.Provider>
    );
}