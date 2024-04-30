import en from "./string/en.json";
import styles from "./MotionInput.module.scss";

import {Button, Dialog} from "@ui/widget";
import i18next from "i18next";
import {For, JSX, createEffect, createResource, createSignal, on} from "solid-js";
import {Modal} from "@ui/widget/Modal";
import {useViewerContext} from "@ui/viewer/context";
import {Id, Motion} from "@type";
import {MotionForm} from "../MotionForm";
import {EntityType} from "@enum";

i18next.addResourceBundle("en", "motion", {"MotionSelectDialog": en}, true, true);

type Props = {
    motionId?: number;
    onSelect?: (assetId: Id) => void;
};

export function MotionInput(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();
    let inputRef: HTMLInputElement | undefined;
    const [selected, setSelected] = createSignal<number | undefined>(
        props.motionId
    );

    const {id: motionTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.MOTION})[0];

    const [motions, {refetch}] = createResource(() => {
        return viewerCtx.store.entity
            .getByParams<Motion>({typeId: motionTypeId});
    });

    createEffect(on(viewerCtx.init, refetch));

    const motionFormDialog = new Modal();
    motionFormDialog.render(
        <Dialog>
            <MotionForm
                onComplete={() => {
                    motionFormDialog.hide();
                }}
                onClose={() => motionFormDialog.hide()}
            />
        </Dialog>
    );

    return (
        <div class={styles.MotionInput}>
            <input ref={inputRef} name="motionId" type="hidden"/>
            <div class={styles.Showcase}>
                <For each={motions()}>
                    {(motion, index) =>
                        <div
                            onClick={() => {
                                if (!inputRef) throw new Error();

                                if (index() == selected()) {
                                    setSelected(undefined);
                                    inputRef.value = "";
                                }
                                else {
                                    setSelected(index());
                                    inputRef.value = String(motion.id);
                                }
                                inputRef.dispatchEvent(new Event("change", {bubbles: true}));
                            }}
                        >
                            {motion.name}
                        </div>
                    }
                </For>
                <button
                    class={styles.Preview}
                    onClick={() => {
                        motionFormDialog.show();
                    }}
                >+</button>
            </div>
        </div>
    );
}