import {Core} from "@core";
import {Input, Modal} from "@ui";

type Context = {
    modal: Modal;
    input: Input;
    core: Core;
}


let context: Context;


export function createContext(newContext: Context): Context {
    context = newContext;
    return context;
}


export function useContext(): Context {
    return context;
}