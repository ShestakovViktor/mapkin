export async function blobToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (): void => resolve(reader.result as string);
        reader.onerror = reject;
    });
}