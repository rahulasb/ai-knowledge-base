'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types';

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: input }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.details || 'Failed to get answer');
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.answer,
                sources: data.sources,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Error: ${(error as Error).message}`,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-280px)] w-full bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            {/* Header */}
            <div className="bg-black border-b border-zinc-800 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Chat</h2>
                <p className="text-sm text-gray-500 mt-0.5">Ask questions about your documents</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-600">
                            <svg
                                className="w-12 h-12 mx-auto mb-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            <p className="text-sm font-medium">No messages yet</p>
                            <p className="text-xs text-gray-700 mt-1">Start by asking a question</p>
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`
                  max-w-[80%] rounded-lg px-4 py-3
                  ${message.role === 'user'
                                        ? 'bg-cyan-600 text-white'
                                        : 'bg-zinc-800 text-gray-100 border border-zinc-700'
                                    }
                `}
                            >
                                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>

                                {message.sources && message.sources.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-zinc-700">
                                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Sources</p>
                                        <div className="space-y-2">
                                            {message.sources.map((source, idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-xs bg-zinc-900 rounded-lg p-2.5 border border-zinc-700"
                                                >
                                                    <div className="font-medium text-cyan-400 mb-1">
                                                        {source.fileName} • Chunk {source.chunkIndex + 1}/{source.totalChunks}
                                                    </div>
                                                    <div className="text-gray-400 text-xs">{source.text}</div>
                                                    {source.score && (
                                                        <div className="text-gray-600 mt-1 text-xs">
                                                            Relevance: {(source.score * 100).toFixed(1)}%
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-800 rounded-lg px-4 py-3 border border-zinc-700">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-zinc-900 border-t border-zinc-800">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question about your documents..."
                        className="flex-1 px-4 py-2.5 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-zinc-800 text-white placeholder-gray-500"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
