export function encodeSlug(string: string): string {
	return string
	.toLowerCase()
	.replace(/-/g, "_")
	.replace(/ /g, "-")
	.replace(/[^\w_-]+/g, "");
}

export function decodeSlug(slug: string): string {
	return slug
	.replace(/-/g, " ")
	.replace(/_/g, "-")
	.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
}
