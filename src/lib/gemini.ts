import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const generateEmbedding = async (text: string): Promise<number[]> => {
    try {
        const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
        const result = await model.embedContent(text);
        return result.embedding.values;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
};

export const generateAnswer = async (
    query: string,
    context: string
): Promise<string> => {
    try {
        // Use gemini-flash-latest for best availability
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const prompt = `You are a helpful AI assistant. Answer the question based ONLY on the provided context. If the answer is not in the context, say "I don't have enough information to answer that question."

Context:
${context}

Question: ${query}

Answer:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating answer:', error);
        throw error;
    }
};
