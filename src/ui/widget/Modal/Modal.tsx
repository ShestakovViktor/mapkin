import {Accessor, JSXElement, Setter, Show, createSignal} from "solid-js";
import {Portal} from "solid-js/web";

export class Modal {
    private visibility: Accessor<boolean>;

    private setVisibility: Setter<boolean>;

    constructor(private target: string) {
        const [visibility, setVisibility] = createSignal(false);
        this.visibility = visibility;
        this.setVisibility = setVisibility;
    }

    show(): void {
        this.setVisibility(true);
    }

    hide(): void {
        this.setVisibility(false);
    }

    render(element: JSXElement): void {
        <Show when={this.visibility()}>
            <Portal mount={document.querySelector(this.target)!}>
                {element}
            </Portal>
        </Show>;
    }
}