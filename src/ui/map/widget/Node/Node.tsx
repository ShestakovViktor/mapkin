import {For, JSXElement, Match, Switch, createSignal} from "solid-js";
import {Node as NodeData} from "@src/type";
import {Tile} from "@src/ui/tile/widget";
import {Group} from "@src/ui/map/widget";
import {Marker} from "@src/ui/marker/widget";
import {useViewerContext} from "@ui/context";

type Props = {
    data: NodeData;
};

export function Node(props: Props): JSXElement {
    const context = useViewerContext();
    const entityId = props.data.id;

    const [entity] = createSignal(context.project.getEntity(entityId));

    return (
        <Switch>
            <Match when={entity()?.type == "group"}>
                <Group entityId={entityId}>
                    <For each={props.data.childs ?? []}>
                        {item => <Node data={item}></Node>}
                    </For>
                </Group>
            </Match>

            <Match when={entity()?.type == "tile"}>
                <Tile entityId={entityId}/>
            </Match>

            <Match when={entity()?.type == "marker"}>
                <Marker entityId={entityId}/>
            </Match>
        </Switch>
    );
}