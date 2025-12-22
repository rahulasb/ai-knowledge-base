import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding, generateAnswer } from '@/lib/gemini';
import { getOrCreateIndex } from '@/lib/pinecone';

export async function POST(request: NextRequest) {
    try {
        const { query } = await request.json();

        if (!query) {
            return NextResponse.json({ error: 'No query provided' }, { status: 400 });
        }

        // Generate embedding for the query
        const queryEmbedding = await generateEmbedding(query);

        // Search Pinecone for relevant chunks
        const index = await getOrCreateIndex(process.env.PINECONE_INDEX_NAME || 'knowledge-base');

        const searchResults = await index.query({
            vector: queryEmbedding,
            topK: 5,
            includeMetadata: true,
        });

        if (!searchResults.matches || searchResults.matches.length === 0) {
            return NextResponse.json({
                answer: "I don't have any documents to reference. Please upload a PDF first.",
                sources: [],
            });
        }

        // Build context from retrieved chunks
        const context = searchResults.matches
            .map((match, idx) => {
                const metadata = match.metadata as {
                    text: string;
                    fileName: string;
                    chunkIndex: number;
                    totalChunks: number;
                };
                return `[Source ${idx + 1}: ${metadata.fileName}, chunk ${metadata.chunkIndex + 1}/${metadata.totalChunks}]\n${metadata.text}`;
            })
            .join('\n\n');

        // Generate answer using Gemini
        const answer = await generateAnswer(query, context);

        // Prepare sources for citation
        const sources = searchResults.matches.map((match) => {
            const metadata = match.metadata as {
                text: string;
                fileName: string;
                chunkIndex: number;
                totalChunks: number;
            };
            return {
                fileName: metadata.fileName,
                chunkIndex: metadata.chunkIndex,
                totalChunks: metadata.totalChunks,
                text: metadata.text.substring(0, 200) + '...',
                score: match.score,
            };
        });

        return NextResponse.json({
            answer,
            sources,
            query,
        });
    } catch (error) {
        console.error('Error processing query:', error);
        return NextResponse.json(
            { error: 'Failed to process query', details: (error as Error).message },
            { status: 500 }
        );
    }
}
