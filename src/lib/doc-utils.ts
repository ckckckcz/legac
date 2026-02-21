import { TocEntry } from '@/components/docs/TableOfContents';

/**
 * Extracts H2 and H3 headings from a Markdown string to generate ToC entries.
 */
export function extractHeadings(markdown: string): TocEntry[] {
    const headings: TocEntry[] = [];

    // Match lines starting with ## or ###
    // Group 1: hashes (for level), Group 2: title text
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;

    let match;
    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length; // 2 or 3
        const title = match[2].trim();

        // Create an anchor from the title (slugify)
        const anchor = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // remove special chars
            .replace(/\s+/g, '-')      // replace spaces with -
            .replace(/-+/g, '-');     // replace multiple - with single -

        headings.push({
            label: title,
            anchor: `#${anchor}`,
        });
    }

    return headings;
}
