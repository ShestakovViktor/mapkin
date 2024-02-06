declare module "*.css" {
    const content: any = {};
    export default content;
}

declare module "*.svg" {
    const content: any = {};
    export default content;
}

declare module "*.module.scss" {
    const content: {[key: string]: string} = {};
    export default content;
}

declare const ENV: string = undefined;

declare const json: string = undefined;