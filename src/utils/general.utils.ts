export function encodeSlug(string: string): string {
  return string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function decodeSlug(slug: string): string {
  return slug.replace(/-/g, " ").replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
}
