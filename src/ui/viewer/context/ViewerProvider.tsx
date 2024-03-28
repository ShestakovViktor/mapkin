import {JSXElement, createSignal} from "solid-js";
import {MapContext, ViewerContext} from "@ui/viewer/context";
import {createStore} from "solid-js/store";
import {Store} from "@store";

type Props = {
    store: Store;
    children: JSXElement | JSXElement[];
};

export function ViewerProvider(props: Props): JSXElement {
    const [init, reInit] = createSignal(undefined, {equals: false});
    const [render, reRender] = createSignal(undefined, {equals: false});
    const [root, setRoot] = createSignal<HTMLElement | undefined>();

    const [mapCtx, setMapCtx] = createStore<MapContext>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        scale: 1,
    });

    const value = {
        store: props.store,
        mapCtx,
        setMapCtx,
        init,
        reInit,
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