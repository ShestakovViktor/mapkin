import {JSXElement} from "solid-js";
import {Portal} from "solid-js/web";

type Props = {
    children?: JSXElement | JSXElement[];
};

export function ModalWidget(props: Props): JSXElement {
    const modal = document.querySelector("#modal");
    if (!modal) throw new Error("There is no modal layer");

    return (
        <Portal mount={modal}>
            <>
                {props.children}
            </>
        </Portal>
    );
}