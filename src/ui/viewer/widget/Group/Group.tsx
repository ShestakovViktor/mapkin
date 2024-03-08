import {JSX, JSXElement} from "solid-js";
import styles from "./Group.module.scss";
import {useViewerContext} from "@ui/viewer/context";
import {Group as GroupData} from "@type";

type Props = {
    entityId: string;
    children?: JSXElement | JSXElement[];
    ref?: HTMLDivElement;
};

export function Group(props: Props): JSXElement {
    const context = useViewerContext();

    const entity = context.project().getEntity(props.entityId) as GroupData;

    function foo(name: string): JSX.CSSProperties {
        if (name == "map") {
            return {
                transform: `translate3d(${context.brect.x + "px"}, ${context.brect.y + "px"}, 0) scale(${context.brect.scale})`,
            };
        }
        else if (name == "overlay") {
            return {
                transform: `translate3d(${context.brect.x + "px"}, ${context.brect.y + "px"}, 0)`,
            };
        }
        else {
            return {};
        }
    }

    return (
        <div
            class={styles.Group}
            id={entity.name}
            style={foo(entity.name)}
            ref={props.ref}
        >
            {props.children}
        </div>
    );
}