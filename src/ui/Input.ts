import {Core} from "@core";
import {Mode, SelectMode, MarkerMode} from "./mode";
import {Modal} from "@ui";

export class Input {

    modes: {[key: string]: Mode};

    mode: Mode;

    constructor(core: Core, modal: Modal) {
        this.modes = {
            select: new SelectMode(core, modal),
            marker: new MarkerMode(core, modal),
        };

        this.mode = this.modes.select;
    }


    setMode(name: keyof typeof this.modes): void {
        console.log(`Mode set: ${name}`);
        this.mode = this.modes[name];
    }


    onMouseClick(event: MouseEvent): void {
        this.mode.onMouseClick(event);
    }


    onMouseUp(event: MouseEvent): void {
        this.mode.onMouseUp(event);
    }
}