/**
 * @typedef {Object} Context
 * @property {import("@src/ui/utility").Modal} modal
 * @property {import("@core").Core} core
*/


/**
 * @type Context
 */
let context;


/**
 * @param {Context} newContext
 * @returns Context
 */
export function createContext(newContext) {
    context = newContext;
    return context;
}


/**
 * @returns Context
 */
export function useContext() {
    return context;
}