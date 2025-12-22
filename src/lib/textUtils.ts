export const chunkText = (text: string, chunkSize: number = 1000, overlap: number = 200): string[] => {
    const chunks: string[] = [];
    let startIndex = 0;

    while (startIndex < text.length) {
        const endIndex = Math.min(startIndex + chunkSize, text.length);
        const chunk = text.slice(startIndex, endIndex);

        // Only add non-empty chunks
        if (chunk.trim().length > 0) {
            chunks.push(chunk.trim());
        }

        startIndex += chunkSize - overlap;
    }

    return chunks;
};

export const cleanText = (text: string): string => {
    // Remove extra whitespace and normalize text
    return text
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, '\n')
        .trim();
};
