import {JSXElement, Show, createSignal} from "solid-js";
import {ModalWidget} from "@src/ui/modal/widget";

export function createModalWidget(): {
    render: (element: JSXElement) => void;
    show: () => void;
    hide: () => void;
} {
    const [visible, setVisibility] = createSignal(false);

    function show(): void {
        setVisibility(true);
    }

    function hide(): void {
        setVisibility(false);
    }

    function render(element: JSXElement): void {
        <Show when={visible()}>
            <ModalWidget>{element}</ModalWidget>
        </Show>;
    }

    return {render, show, hide};
}