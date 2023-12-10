/* eslint-disable no-unused-vars */

/**
 * @class
 * @abstract
 */
export class Mode {
    /**
     * @param {MouseEvent} event
     */
    onMouseDown(event) {
        throw new Error("Methor must be implemented");
    }

    /**
     * @param {MouseEvent} event
     */
    onMouseUp(event) {
        throw new Error();
    }
}