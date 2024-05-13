import {Area, Group, Id} from "@type";
import {Input} from "@ui/editor/mode";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {ENTITY, LAYER} from "@enum";
import {Accessor, Setter, createSignal} from "solid-js";
import {pushAreaPoint} from "@ui/area/utility/pushAreaPoint";

export class AreaMode extends Input {
    private getEntityId: Accessor<Id | undefined>;

    private setEntityId: Setter<Id | undefined>;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();

        const signal = createSignal<number>();
        [this.getEntityId, this.setEntityId] = signal;
    }

    initArea(): Id {
        const {id: typeId} = this.editorCtx.store.type
            .getByParams({name: ENTITY.AREA})[0];

        const areaId = this.editorCtx.store.entity.add<Area>({
            typeId,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            points: [],
            text: "",
            graphicIds: [],
        });

        const overlay = this.editorCtx.store.entity
            .getByParams<Group>({name: LAYER.OVERLAY})[0];

        overlay.childIds.push(areaId);

        this.editorCtx.store.entity.set(overlay);

        this.setEntityId(areaId);

        return areaId;
    }

    onPointerDown(event: MouseEvent): void {
        const click = {
            x: (event.x - this.viewerCtx.mapCtx.x)
                / this.viewerCtx.mapCtx.scale,
            y: (event.y - this.viewerCtx.mapCtx.y)
                / this.viewerCtx.mapCtx.scale,
        };

        let areaId = this.getEntityId();

        if (!areaId) areaId = this.initArea();

        this.editorCtx.formMode?.set("area", areaId);

        const area = this.editorCtx.store.entity
            .getById<Area>(areaId);

        if (!area) throw new Error();

        pushAreaPoint(area, click);

        this.viewerCtx.reRender();

        this.editorCtx.store.entity.set(area);

        this.editorCtx.focusMode?.set(areaId);
    }
}