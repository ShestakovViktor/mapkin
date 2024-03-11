import {JSXElement, createMemo} from "solid-js";
import {Tile} from "@src/ui/tile/widget";
import {Group} from "@src/ui/viewer/widget";
import {Marker} from "@src/ui/marker/widget";
import {useViewerContext} from "@ui/viewer/context";
import {Dynamic} from "solid-js/web";

type Props = {
    entityId: string;
    ref?: HTMLDivElement | ((el: HTMLElement) => void);
};

export function Entity(props: Props): JSXElement {
    const context = useViewerContext();

    const entity = createMemo(() => context.project()
        .getEntityById(props.entityId), undefined, {equals: false});

    const entities: {
        [key: string]: (props: {entityId: string}) => JSXElement;
    } = {
        group: Group,
        tile: Tile,
        marker: Marker,
    };

    return (
        <Dynamic
            component={entities[entity()?.type ?? ""]}
            entityId={props.entityId}
            ref={props.ref}
        />
    );
}