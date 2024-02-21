import {createContext, useContext} from "solid-js";
import {Project} from "@src/project";

type Context = {
    project: Project;
};

export const ViewerContext = createContext<Context | undefined>();

export function useViewerContext(): Context {
    const context = useContext(ViewerContext);
    if (!context) {
        throw new Error("There is no viewer context");
    }
    return context;
}
