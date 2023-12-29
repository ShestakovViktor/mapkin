/* eslint-disable @typescript-eslint/no-unused-vars */
import {Core} from "@core";
import {Modal} from "@ui";

export class Mode {

    constructor(protected core: Core, protected modal: Modal) {}

    onMouseClick(event: MouseEvent): void {
        throw new Error("Method must be implemented");
    }


    onMouseUp(event: MouseEvent): void {
        throw new Error("Method must be implemented");
    }
}