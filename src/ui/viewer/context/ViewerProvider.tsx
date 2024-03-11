import {JSXElement, createSignal} from "solid-js";
import {MapContext, ViewerContext} from "@ui/viewer/context";
import {createStore} from "solid-js/store";
import {Project} from "@project";

type Props = {
    project: Project;
    children: JSXElement | JSXElement[];
};

export function ViewerProvider(props: Props): JSXElement {
    const [render, reRender] = createSignal(undefined, {equals: false});
    const [root, setRoot] = createSignal<HTMLElement | undefined>();

    const [project, setProject] = createSignal(
        props.project, {equals: false}
    );

    const [mapCtx, setMapCtx] = createStore<MapContext>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        scale: 1,
    });

    const [rootCtx, setRootCtx] = createStore<MapContext>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        scale: 1,
    });

    const value = {
        project,
        setProject,
        mapCtx,
        setMapCtx,
        rootCtx,
        setRootCtx,
        render,
        reRender,
        root,
        setRoot,
    };

    return (
        <ViewerContext.Provider value={value}>
            {props.children}
        </ViewerContext.Provider>
    );
}