import {JSXElement, createSignal} from "solid-js";
import {EditorContext} from "@ui/editor/context";
import {Core} from "@core";
import {Mode} from "@ui/editor/utility";

type Props = {
    value: {
        core: Core;
    };
    children: JSXElement | JSXElement[];
};

export function EditorProvider(props: Props): JSXElement {
    const [mode, setMode] = createSignal(new Mode());

    const value = {...props.value, mode, setMode};

    return (
        <EditorContext.Provider value={value}>
            {props.children}
        </EditorContext.Provider>
    );
}