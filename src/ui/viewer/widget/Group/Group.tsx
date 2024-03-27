import {JSX, JSXElement, createMemo} from "solid-js";
import styles from "./Group.module.scss";
import {useViewerContext} from "@ui/viewer/context";
import {Group as GroupData} from "@type";
import {Entity} from "../Entity";

type Props = {
    entityId: string;
    ref?: HTMLDivElement;
};

export function Group(props: Props): JSXElement {
    const context = useViewerContext();

    const entity = createMemo(
        () => context.project().getEntityById(props.entityId) as GroupData,
        undefined,
        {equals: false}
    );

    const childs = createMemo(
        () => entity().childs.map(child => <Entity entityId={child}/>)
    );

    function foo(name: string): JSX.CSSProperties {
        if (name == "root") {
            return {
                transform: `translate3d(${context.mapCtx.x + "px"}, ${context.mapCtx.y + "px"}, 0)`,
            };
        }
        else if (name == "map") {
            return {
                transform: `scale(${context.mapCtx.scale})`,
            };
        }
        else {
            return {};
        }
    }

    return (
        <div
            class={styles.Group}
            id={entity().name}
            style={foo(entity().name)}
            ref={props.ref}
        >
            {childs()}
        </div>
    );
}