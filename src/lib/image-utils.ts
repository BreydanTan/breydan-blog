/**
 * Extract the first image URL from markdown content
 */
export function extractFirstImage(content: string): string | null {
  // Match markdown image syntax: ![alt](url)
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = content.match(imageRegex);
  return match ? match[1] : null;
}

/**
 * Extract cover image from frontmatter or content
 */
export function getCoverImage(blog: any): string | null {
  // Check for explicit cover/image field in frontmatter
  if (blog.cover) return blog.cover;
  if (blog.image) return blog.image;
  if (blog.thumbnail) return blog.thumbnail;

  // Extract from content
  return extractFirstImage(blog.content);
}
