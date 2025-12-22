'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadResponse } from '@/types';

interface FileUploadProps {
    onUploadSuccess: (response: UploadResponse) => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        setUploading(true);
        setUploadStatus('Uploading and processing PDF...');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUploadStatus(`Successfully processed ${data.chunks} chunks`);
                onUploadSuccess(data);
            } else {
                setUploadStatus(`Error: ${data.error}`);
            }
        } catch (error) {
            setUploadStatus(`Upload failed: ${(error as Error).message}`);
        } finally {
            setUploading(false);
        }
    }, [onUploadSuccess]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1,
        disabled: uploading,
    });

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragActive
                        ? 'border-cyan-500 bg-cyan-500/5'
                        : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/30'
                    }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${isDragActive ? 'bg-cyan-500/10' : 'bg-zinc-800'}`}>
                            <svg
                                className={`w-8 h-8 ${isDragActive ? 'text-cyan-400' : 'text-gray-400'} transition-colors`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                        </div>
                        {uploading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 border-2 border-cyan-500 border-t-transparent rounded-xl animate-spin" />
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="text-xl font-semibold text-white mb-1">
                            {isDragActive ? 'Drop PDF here' : 'Upload PDF Document'}
                        </p>
                        <p className="text-sm text-gray-500">
                            Drag and drop or click to browse
                        </p>
                    </div>

                    {uploadStatus && (
                        <div
                            className={`
                mt-2 px-4 py-2 rounded-lg text-sm font-medium border
                ${uploadStatus.includes('Successfully')
                                    ? 'bg-cyan-950/30 text-cyan-400 border-cyan-500/30'
                                    : uploadStatus.includes('Error') || uploadStatus.includes('failed')
                                        ? 'bg-red-950/30 text-red-400 border-red-500/30'
                                        : 'bg-zinc-800 text-gray-400 border-zinc-700'
                                }
              `}
                        >
                            {uploadStatus}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
