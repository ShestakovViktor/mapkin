declare module '*.css' {
	const content: any;
	export default content;
}

declare module '*.module.scss' {
	const content: { [key: string]: string };
	export default content;
}

