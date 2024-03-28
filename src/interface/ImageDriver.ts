export type ImageTile = {
    x: number;
    y: number;
    width: number;
    height: number;
    base64: string;
};

export interface ImageDriver {
    initImage(blob: Blob, rows: number, cols: number): Promise<{
        width: number;
        height: number;
        tiles: ImageTile[];
    }>;

    fooImage(file: File, width: number, height: number): Promise<string>;
}