import {TabView} from "@src/ui/widget";
import styles from "./ProjectMenu.module.scss";
import en from "./string/en.json";

export function ProjectMenu(): HTMLDivElement {
    const foo = document.createElement("div");
    foo.innerText = "hello world";

    const foo2 = document.createElement("div");
    foo2.innerText = "world hello";

    return TabView({
        children: {
            hello: foo,
            world: foo2,
        },
    });
}