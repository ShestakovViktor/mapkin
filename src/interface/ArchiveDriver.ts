export interface ArchiveDriver {
    archive(blobs: {[key: string]: Blob}): Promise<Blob>;
    extract(blob: Blob): Promise<{[key: string]: Blob}>;
}