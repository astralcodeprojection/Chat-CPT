import { GoogleGenAI } from '@google/genai';

try {
    const ai = new GoogleGenAI({ apiKey: 'YOUR_FAKE_KEY' });
    // The correct way to get a model is to *call* getGenerativeModel
    const model = ai.getGenerativeModel({ model: 'gemini-1.0-pro' }); // Or 'gemini-2.0-flash'
    if (model) { // Check if a model instance was returned
        console.log('SUCCESS: getGenerativeModel works and returned a model.');
        console.log('Model object keys:', Object.keys(model));
    } else {
        console.log('FAILURE: getGenerativeModel did not return a model.');
    }
} catch (error) {
    console.error('Error during test:', error.message);
}