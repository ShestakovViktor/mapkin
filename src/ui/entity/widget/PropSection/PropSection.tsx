import styles from "./PropSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {Id} from "@type";
import {PropSelect} from "@ui/prop/widget";

i18next.addResourceBundle("en", "entity", {PropSection: en}, true, true);

type Props = {
    entity: Resource<{propId: Id | null} | null>;
};

export function PropSection(props: Props): JSX.Element {
    return (
        <Section
            class={styles.PropSection}
            title={
                i18next.t(
                    "entity:PropSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <PropSelect entity={props.entity}/>
        </Section>
    );
}