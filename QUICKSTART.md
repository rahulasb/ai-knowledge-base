# 🚀 Quick Start Guide - AI Knowledge Base

## Your Application is Ready!

The AI Knowledge Base is now running at: **http://localhost:3000**

## ✅ What's Built

### Core Features
- ✅ **PDF Upload System** - Drag & drop interface
- ✅ **Text Chunking** - Smart splitting with overlap
- ✅ **Gemini Embeddings** - Vector generation
- ✅ **Pinecone Storage** - Vector database integration
- ✅ **Chat Interface** - Q&A with source citations
- ✅ **Beautiful UI** - Gradient design with animations

### API Endpoints
- `POST /api/upload` - Upload and process PDFs
- `POST /api/chat` - Query the knowledge base

## 📝 How to Use

### 1. Upload a PDF
- Go to http://localhost:3000
- Drag and drop a PDF file or click to select
- Wait for processing (you'll see chunk count)

### 2. Ask Questions
- After upload, the chat interface appears
- Type your question about the PDF
- Get AI-generated answers with source citations

### 3. View Sources
- Each answer shows which document chunks were used
- See file name and chunk position
- Relevance score for each source

## 🔧 Configuration

### Environment Variables (.env.local)
```
PINECONE_API_KEY=pcsk_4yNaq_9B3WGv1T9VgXWXV2UkR3yj5js6qEfJE9tMdTBcg5sb8xHi5XMPRgFbqJ7gEvxh2
PINECONE_INDEX_NAME=knowledge-base
GOOGLE_API_KEY=AIzaSyAAxNQyGeWf8wZVg0lXSyiuf46ywLBUJQI
```

### Pinecone Index Requirements
- **Dimension**: 768 (Gemini embedding size)
- **Metric**: Cosine similarity
- **Type**: Serverless (AWS us-east-1)

The index will be auto-created on first upload if it doesn't exist!

## 🎨 Customization Options

### Adjust Chunk Size
Edit `src/lib/textUtils.ts`:
```typescript
chunkText(text, 1000, 200) // chunkSize=1000, overlap=200
```

### Change Number of Retrieved Sources
Edit `src/app/api/chat/route.ts`:
```typescript
const searchResults = await index.query({
  vector: queryEmbedding,
  topK: 5, // Change this number
  includeMetadata: true,
});
```

### Modify UI Colors
Update Tailwind classes in:
- `src/app/page.tsx` - Main landing page
- `src/components/FileUpload.tsx` - Upload component
- `src/components/ChatInterface.tsx` - Chat UI

### Switch AI Models
Edit `src/lib/gemini.ts`:
```typescript
// For embeddings:
model: 'text-embedding-004'

// For answers:
model: 'gemini-2.0-flash-exp'
```

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `PINECONE_API_KEY`
   - `PINECONE_INDEX_NAME`
   - `GOOGLE_API_KEY`
5. Click "Deploy"

Your app will be live at `https://your-app.vercel.app`

## 🧪 Testing

### Test with Sample Questions
After uploading a PDF, try questions like:
- "What is the main topic of this document?"
- "Summarize the key points"
- "What does it say about [specific topic]?"

### Verify Sources
- Check that returned sources match the answer
- Verify chunk indices make sense
- Test relevance scores

## 🐛 Troubleshooting

### Common Issues

**1. "Cannot find module" errors**
```bash
npm install
```

**2. Pinecone connection errors**
- Check API key in .env.local
- Verify index name matches
- Ensure index dimension is 768

**3. Gemini API errors**
- Verify API key is valid
- Check quota limits
- Try regenerating the key

**4. PDF upload fails**
- Check file size (< 10MB recommended)
- Ensure it's a valid PDF
- Check console for errors

**5. Build errors**
```bash
rm -rf .next
npm run dev
```

## 📊 Performance Tips

### For Large PDFs
- PDFs are chunked automatically
- Each chunk generates an embedding (takes time)
- Expect ~1-2 seconds per chunk

### Optimize Query Speed
- Pinecone indexes are fast
- First query may be slower (cold start)
- Subsequent queries are instant

### Rate Limits
- Gemini: Free tier has limits
- Batch upserts to Pinecone in groups of 100
- Add delays if hitting rate limits

## 🎯 Next Steps

### Enhancements to Consider
1. **Multi-document support** - Search across many PDFs
2. **Document management** - Delete/list uploaded docs
3. **Chat history** - Save conversations
4. **User authentication** - Add login system
5. **Export answers** - Download as PDF/text
6. **Voice input** - Speech-to-text queries

### Advanced Features
- Implement streaming responses
- Add follow-up question suggestions
- Create document summaries
- Build semantic search UI
- Add analytics dashboard

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Pinecone Docs](https://docs.pinecone.io)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [LangChain](https://js.langchain.com/docs)

## 💡 Tips

- Start with small PDFs for testing
- Monitor your API usage
- Keep your .env.local private
- Regular backups of Pinecone data
- Test on different browsers

---

**Need Help?** Check the main README.md for detailed information.

**Happy Knowledge Building! 🎉**
