import styles from "./Image.module.scss";

type Props = {
    class?: string;
    src: string;
    onClick?: (event?: MouseEvent) => void;
};

export function Image(props: Props): HTMLDivElement {
    const image = document.createElement("img");
    image.src = props.src;
    image.classList.add(styles.Image);
    if (props.class) image.classList.add(props.class);
    if (props.onClick) {
        image.addEventListener("click", (event) => {
            if (props.onClick) props.onClick(event);
        });
    }
    return image;
}