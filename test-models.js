const https = require('https');

const API_KEY = process.env.GOOGLE_API_KEY;

function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                if (json.models) {
                    console.log('Available models:');
                    json.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods})`));
                } else {
                    console.log('No models found or error:', json);
                }
            } catch (e) {
                console.log('Error parsing JSON:', e.message);
                console.log('Raw data:', data);
            }
        });
    }).on('error', (e) => {
        console.error('Request error:', e);
    });
}

listModels();
