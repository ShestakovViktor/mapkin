import {Map} from "@viewer/layout";
import {Mouse, Pivot, Visualiser} from "@viewer";
import {Project} from "@src/core";

export class Viewer {
    private map: HTMLDivElement;

    private visualiser?: Visualiser ;

    private pivot: Pivot;

    private mouse: Mouse;

    constructor(
        private root: HTMLElement,
        private project?: Project
    ) {

        this.map = Map({children: []});
        root.appendChild(this.map);

        this.pivot = new Pivot();
        this.mouse = new Mouse(this.map, this.pivot);

        if (project) {
            this.visualiser = new Visualiser(this.map, this.pivot, project);
        }
    }

    setProject(project: Project): void {
        this.project = project;
        this.visualiser = new Visualiser(this.map, this.pivot, project);
    }

    render(): void {
        this.visualiser?.render();
    }
}