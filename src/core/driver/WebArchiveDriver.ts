import {ArchiveDriver} from "@src/interface";

import JSZip from "jszip";


export class WebArchiveDriver implements ArchiveDriver {
    async archive(data: {[key: string]: Blob}): Promise<Blob> {
        const archive = JSZip();

        for (const path in data) {
            const blob = data[path];
            archive.file(path, blob, {createFolders: true});
        }

        return await archive.generateAsync({type: "blob"});
    }

    async extract(blob: Blob): Promise<{[key: string]: Blob}> {
        const result: {[key: string]: Blob} = {};
        const archive = await JSZip.loadAsync(blob);

        for (const filename in archive.files) {
            const blob = await archive.files[filename].async("blob");
            result[filename] = blob;
        }

        return result;
    }
}