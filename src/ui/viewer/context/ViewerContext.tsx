import {Accessor, Setter, createContext, useContext} from "solid-js";
import {Project} from "@project";
import {SetStoreFunction} from "solid-js/store";
import {MapContext, RootContext} from "@ui/viewer/context";

export type ViewerContextType = {
    project: Accessor<Project>;
    setProject: Setter<Project>;

    render: Accessor<undefined>;
    reRender: Setter<undefined>;

    root: Accessor<HTMLElement | undefined>;
    setRoot: Setter<HTMLElement | undefined>;

    mapCtx: MapContext;
    setMapCtx: SetStoreFunction<MapContext>;

    rootCtx: RootContext;
    setRootCtx: SetStoreFunction<RootContext>;

};

export const ViewerContext = createContext<ViewerContextType | undefined>();

export function useViewerContext(): ViewerContextType {
    const context = useContext(ViewerContext);
    if (!context) {
        throw new Error("There is no viewer context");
    }
    return context;
}
