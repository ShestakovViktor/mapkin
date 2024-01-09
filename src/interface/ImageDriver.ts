export type ImageTile = {
    x: number;
    y: number;
    width: number;
    height: number;
    blob: Blob;
};

export interface ImageDriver {
    initImage(blob: Blob, rows: number, cols: number): Promise<{
        width: number;
        height: number;
        tiles: ImageTile[];
    }>;
}