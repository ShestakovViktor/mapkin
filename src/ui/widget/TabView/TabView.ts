import styles from "./TabView.module.scss";

type Props = {
    children?: {[key: string]: Element};
    id?: string;
    class?: string;
    selected?: number;
};

export function TabView(props: Props): HTMLDivElement {
    const tabView = document.createElement("div");
    tabView.classList.add(styles.TabView);

    const bar = document.createElement("div");
    bar.classList.add(styles.TabBar);

    const area = document.createElement("div");
    bar.classList.add(styles.TabArea);

    function show(element: HTMLElement): void {
        area.innerHTML = "";
        area.appendChild(element);
    }

    for (const key in props.children) {
        const body = document.createElement("div");
        body.classList.add(styles.TabBody);
        body.appendChild(props.children[key]);

        const head = document.createElement("div");
        head.addEventListener("click", () => show(body));
        head.classList.add(styles.TabHead);
        head.innerText = key;

        bar.appendChild(head);
        area.appendChild(body);
    }

    tabView.appendChild(bar);
    tabView.appendChild(area);

    return tabView;
}