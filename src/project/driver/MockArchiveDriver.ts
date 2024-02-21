/* eslint-disable @typescript-eslint/no-unused-vars */
import {ArchiveDriver} from "@src/interface";

export class MockArchiveDriver implements ArchiveDriver {
    async archive(data: {[key: string]: Blob}): Promise<Blob> {
        const result: {[key: string]: string} = {};

        for (const key in data) {
            const blob = data[key];
            result[key] = btoa(await blob.text());
        }

        const resultString = JSON.stringify(result, null, 4);

        return new Promise(resolve => resolve(new Blob([resultString])));
    }

    async extract(blob: Blob): Promise<{[key: string]: Blob}> {
        const result: {[key: string]: Blob} = {};

        const dataString = JSON.parse(await blob.text());

        for (const path in dataString) {
            const byteCharacters = atob(dataString[path]);
            const byteArrays = [];

            for (let i = 0; i < byteCharacters.length; i++) {
                byteArrays.push(byteCharacters.charCodeAt(i));
            }

            const byteArray = new Uint8Array(byteArrays);
            result[path] = new Blob([byteArray], {type: ""});
        }

        return new Promise(resolve => resolve(result));
    }
}