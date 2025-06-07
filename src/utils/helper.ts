export const generateSlug = (title: string) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const uniqueSuffix = Math.random().toString(36).substring(2, 8);
  return `${slug}-${uniqueSuffix}`;
};
