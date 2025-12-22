import { Pinecone } from '@pinecone-database/pinecone';

let pineconeClient: Pinecone | null = null;

export const getPineconeClient = async () => {
  if (pineconeClient) {
    return pineconeClient;
  }

  pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  return pineconeClient;
};

export const getOrCreateIndex = async (indexName: string) => {
  const client = await getPineconeClient();
  
  try {
    const indexList = await client.listIndexes();
    const indexExists = indexList.indexes?.some(index => index.name === indexName);

    if (!indexExists) {
      console.log(`Creating new index: ${indexName}`);
      await client.createIndex({
        name: indexName,
        dimension: 768, // Gemini embedding dimension
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1',
          },
        },
      });
      
      // Wait for index to be ready
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    return client.index(indexName);
  } catch (error) {
    console.error('Error creating/accessing index:', error);
    throw error;
  }
};
