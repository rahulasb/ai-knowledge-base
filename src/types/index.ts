export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    sources?: Source[];
    timestamp: Date;
}

export interface Source {
    fileName: string;
    chunkIndex: number;
    totalChunks: number;
    text: string;
    score?: number;
}

export interface UploadResponse {
    success: boolean;
    message: string;
    chunks: number;
    fileName: string;
}

export interface ChatResponse {
    answer: string;
    sources: Source[];
    query: string;
}
