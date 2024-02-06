import {Core} from "@core";
import {Viewer} from "@viewer";
import {Input, Modal} from "@ui";

export type Context = {
    modal: Modal;
    input: Input;
    viewer: Viewer;
    core: Core;
};

let context: Context | undefined = undefined;

export function createContext(newContext: Context): Context {
    context = newContext;
    return context;
}

export function useContext(): Context {
    if (!context) throw new Error("Context not initialized");
    return context;
}