/**
 * @typedef {{
 *     modal: import("@ui/utility").Modal;
 *     input: import("@ui/utility").Input;
 *     core: import("@core").Core;
 * }} Context
 */


/** @type Context */
let context;


/**
 * @param {Context} newContext
 * @returns {Context}
 */
export function createContext(newContext) {
    context = newContext;
    return context;
}


/** @returns {Context} */
export function useContext() {
    return context;
}