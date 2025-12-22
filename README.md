# AI Knowledge Base - RAG Application

A powerful RAG (Retrieval Augmented Generation) based AI knowledge base built with Next.js, Gemini AI, and Pinecone vector database.

## 🚀 Features

- **PDF Upload**: Drag-and-drop interface for uploading PDF documents
- **Smart Chunking**: Automatically splits documents into digestible chunks with overlap
- **AI Embeddings**: Uses Google's Gemini model to generate vector embeddings
- **Vector Storage**: Stores embeddings in Pinecone for fast semantic search
- **Chat Interface**: Ask questions and get answers based on your documents
- **Source Citations**: See which parts of your documents were used to answer questions
- **Beautiful UI**: Premium gradient design with smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **LLM**: Google Gemini 3 API (gemini-2.0-flash-exp)
- **Embeddings**: Gemini text-embedding-004 model
- **Vector Database**: Pinecone
- **PDF Processing**: LangChain PDF Loader
- **TypeScript**: Full type safety

## 📋 Prerequisites

- Node.js 18+ and npm
- Pinecone account and API key
- Google AI (Gemini) API key

## 🔧 Setup

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:

Create a `.env.local` file in the root directory:

```bash
# Pinecone API Configuration
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=knowledge-base

# Google Gemini API Configuration
GOOGLE_API_KEY=your_google_api_key_here
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

### RAG Architecture

1. **Document Ingestion**:
   - User uploads a PDF
   - PDF is parsed and text is extracted
   - Text is cleaned and split into ~1000 character chunks with 200 character overlap

2. **Embedding Generation**:
   - Each chunk is converted to a 768-dimensional vector using Gemini
   - Vectors are stored in Pinecone with metadata (filename, chunk index, text)

3. **Query Processing**:
   - User asks a question
   - Question is converted to a vector embedding
   - Pinecone finds the top 5 most similar document chunks

4. **Answer Generation**:
   - Retrieved chunks are used as context
   - Gemini generates an answer based only on the context
   - Sources are shown with chunk references

## 📁 Project Structure

```
ai-knowledge-base/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── upload/route.ts    # PDF upload & processing
│   │   │   └── chat/route.ts      # Chat/query endpoint
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Main UI
│   │   └── globals.css
│   ├── components/
│   │   ├── FileUpload.tsx         # Drag-drop upload UI
│   │   └── ChatInterface.tsx      # Chat interface
│   ├── lib/
│   │   ├── pinecone.ts            # Pinecone client
│   │   ├── gemini.ts              # Gemini AI utilities
│   │   └── textUtils.ts           # Text chunking
│   └── types/
│       └── index.ts               # TypeScript types
├── .env.local
└── package.json
```

## 🚀 Deployment to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add environment variables**:
   In Vercel dashboard → Settings → Environment Variables, add:
   - `PINECONE_API_KEY`
   - `PINECONE_INDEX_NAME`
   - `GOOGLE_API_KEY`

4. **Deploy**:
   - Vercel will automatically deploy
   - Your app will be live at `https://your-app.vercel.app`

## 🔑 API Keys Setup

### Pinecone
1. Sign up at [pinecone.io](https://www.pinecone.io/)
2. Create a new serverless index (dimension: 768, metric: cosine)
3. Copy your API key from the dashboard

### Google Gemini
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key
3. Enable the Gemini API

## 📝 Usage

1. **Upload a PDF**:
   - Drag and drop a PDF or click to select
   - Wait for processing (you'll see a success message)

2. **Ask Questions**:
   - Type your question in the chat input
   - Get AI-generated answers based on your document
   - View source citations showing which parts were used

3. **Upload More Documents**:
   - Click "Upload another document" to add more PDFs
   - All documents are searchable in the same knowledge base

## 🎨 Customization

- **Chunk Size**: Modify `chunkText()` parameters in `src/lib/textUtils.ts`
- **Number of Sources**: Change `topK` in `src/app/api/chat/route.ts`
- **UI Colors**: Update Tailwind classes in components
- **Models**: Change model names in `src/lib/gemini.ts`

## 🐛 Troubleshooting

- **"Cannot find module" errors**: Run `npm install` again
- **Pinecone errors**: Ensure index dimension is 768 and metric is cosine
- **API errors**: Check your environment variables are set correctly
- **Build errors**: Try `npm run build` to see detailed error messages

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

Built with ❤️ using Next.js, Gemini AI, and Pinecone
