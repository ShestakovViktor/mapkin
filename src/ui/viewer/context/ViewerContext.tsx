import {createContext, useContext} from "solid-js";
import {Project} from "@project";
import {SetStoreFunction} from "solid-js/store";
import {Brect} from "@type";

type Context = {
    project: () => Project;
    brect: Brect;
    setBrect: SetStoreFunction<Brect>;
};

export const ViewerContext = createContext<Context | undefined>();

export function useViewerContext(): Context {
    const context = useContext(ViewerContext);
    if (!context) {
        throw new Error("There is no viewer context");
    }
    return context;
}
