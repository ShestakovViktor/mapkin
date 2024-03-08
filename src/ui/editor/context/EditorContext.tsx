import {createContext, useContext} from "solid-js";
import {Core} from "@core";
import {Project} from "@project";
import {Mode} from "@ui/editor/utility";

type Context = {
    core: Core;
    project: () => Project;
    mode: () => Mode;
    setMode: (mode: Mode) => void;
};

export const EditorContext = createContext<Context | undefined>();

export function useEditorContext(): Context {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error("There is no editor context");
    }

    return context;
}

