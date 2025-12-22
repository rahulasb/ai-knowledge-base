import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/gemini';
import { getOrCreateIndex } from '@/lib/pinecone';
import { chunkText, cleanText } from '@/lib/textUtils';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Parse PDF using pdf-parse (v1.1.1)
        // Import directly from lib to avoid buggy index.js in Next.js
        const pdfParse = require('pdf-parse/lib/pdf-parse.js');
        const pdfData = await pdfParse(buffer);
        const text = cleanText(pdfData.text);

        // Chunk the text
        const chunks = chunkText(text, 1000, 200);

        console.log(`Processing ${chunks.length} chunks from PDF...`);

        // Generate embeddings and store in Pinecone
        const index = await getOrCreateIndex(process.env.PINECONE_INDEX_NAME || 'knowledge-base');

        const vectors = [];
        for (let i = 0; i < chunks.length; i++) {
            const embedding = await generateEmbedding(chunks[i]);

            vectors.push({
                id: `${file.name}-chunk-${i}`,
                values: embedding,
                metadata: {
                    text: chunks[i],
                    fileName: file.name,
                    chunkIndex: i,
                    totalChunks: chunks.length,
                },
            });

            // Batch upsert every 100 vectors to avoid rate limits
            if (vectors.length >= 100 || i === chunks.length - 1) {
                await index.upsert(vectors);
                console.log(`Upserted ${vectors.length} vectors`);
                vectors.length = 0; // Clear the array
            }
        }

        return NextResponse.json({
            success: true,
            message: `Successfully processed ${chunks.length} chunks from ${file.name}`,
            chunks: chunks.length,
            fileName: file.name,
        });
    } catch (error) {
        console.error('Error processing PDF:', error);
        return NextResponse.json(
            { error: 'Failed to process PDF', details: (error as Error).message },
            { status: 500 }
        );
    }
}
