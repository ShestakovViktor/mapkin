import {Accessor, Setter, createContext, useContext} from "solid-js";
import {Store} from "@store";
import {SetStoreFunction} from "solid-js/store";
import {MapContext} from "@ui/viewer/context";

export type ViewerContextType = {
    store: Store;

    init: Accessor<undefined>;
    reInit: Setter<undefined>;

    render: Accessor<undefined>;
    reRender: Setter<undefined>;

    root: Accessor<HTMLElement | undefined>;
    setRoot: Setter<HTMLElement | undefined>;

    mapCtx: MapContext;
    setMapCtx: SetStoreFunction<MapContext>;
};

export const ViewerContext = createContext<ViewerContextType | undefined>();

export function useViewerContext(): ViewerContextType {
    const context = useContext(ViewerContext);
    if (!context) {
        throw new Error("There is no viewer context");
    }
    return context;
}
