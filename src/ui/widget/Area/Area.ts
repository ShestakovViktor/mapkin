import styles from "./Area.module.scss";

type Props = {
    class?: string;
    children?: HTMLElement[];
};

export function Area(props?: Props): HTMLDivElement {
    const area = document.createElement("div");
    area.classList.add(styles.Area);

    if (props?.class) area.classList.add(props.class);

    if (props?.children) {
        props.children.forEach(child => {
            child.classList.add(styles.Area);
            area.appendChild(child);
        });
    }

    return area;
}