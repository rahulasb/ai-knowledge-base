'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ChatInterface from '@/components/ChatInterface';
import { UploadResponse } from '@/types';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleUploadSuccess = (response: UploadResponse) => {
    setUploadedFile(response);
    setShowChat(true);
  };

  return (
    <main className="min-h-screen bg-black relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Full-width header */}
      <header className="relative z-10 border-b border-zinc-800/50">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10">
                <img src="/logo.svg" alt="App Logo" className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white tracking-tight leading-none">
                    AI Knowledge Base
                  </h1>
                  <a
                    href="https://www.linkedin.com/in/rahul-adhini-satheesh-babu-4b3aa3285/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-medium text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 px-4 py-1 rounded-full uppercase tracking-wider hover:bg-cyan-950/50 hover:border-cyan-500/50 transition-all duration-200"
                  >
                    Code Authored by Rahul Adhini
                  </a>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              RAG-powered document Q&A
            </p>
          </div>
          {uploadedFile && (
            <div className="flex items-center gap-3 bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm">
                <span className="font-medium">{uploadedFile.fileName}</span>
                <span className="text-cyan-500/70 ml-2">• {uploadedFile.chunks} chunks</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content area - two column layout */}
      <div className="relative z-10 grid grid-cols-12 gap-8 px-8 py-8 min-h-[calc(100vh-180px)]">
        {/* Main workspace - Left side */}
        <div className="col-span-12 lg:col-span-8">
          {!showChat ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Upload Document</h2>
                <p className="text-sm text-gray-500 mb-6">Start by uploading a PDF to create your knowledge base</p>
                <FileUpload onUploadSuccess={handleUploadSuccess} />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Conversation</h2>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-500 hover:text-cyan-400 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload new document
                </button>
              </div>
              <ChatInterface />
            </div>
          )}
        </div>

        {/* Sidebar - Right side */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Features</h3>
            <div className="space-y-3">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white mb-1">Document Processing</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Instant PDF parsing and vectorization
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white mb-1">AI Embeddings</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Vector embeddings via Gemini API
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white mb-1">Intelligent Q&A</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Context-aware answers with citations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-zinc-800 text-gray-400 text-xs rounded border border-zinc-700">Gemini AI</span>
              <span className="px-2 py-1 bg-zinc-800 text-gray-400 text-xs rounded border border-zinc-700">Pinecone</span>
              <span className="px-2 py-1 bg-zinc-800 text-gray-400 text-xs rounded border border-zinc-700">Next.js</span>
              <span className="px-2 py-1 bg-zinc-800 text-gray-400 text-xs rounded border border-zinc-700">LangChain</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center border-t border-zinc-800/50">
        <a
          href="https://www.linkedin.com/in/rahul-adhini-satheesh-babu-4b3aa3285/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 text-xs hover:text-cyan-400 transition-colors duration-200 inline-flex items-center gap-1.5 hover:underline decoration-cyan-400/30 underline-offset-4"
        >
          &copy; 2025 Rahul Adhini
          <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </footer>
    </main>
  );
}
