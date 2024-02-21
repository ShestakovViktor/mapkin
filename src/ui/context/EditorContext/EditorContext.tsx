import {createContext, useContext} from "solid-js";
import {Core} from "@core";
import {Project} from "@project";

type Context = {
    core: Core;
    project: Project;
    foo: () => Project;
};

export const EditorContext = createContext<Context | undefined>();

export function useEditorContext(): Context {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error("There is no editor context");
    }

    return context;
}

