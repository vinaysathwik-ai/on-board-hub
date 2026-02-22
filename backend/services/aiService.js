const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Doc = require('../models/Doc');

const OLLAMA_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';




const queryOllama = async (prompt) => {
    try {
        console.log('Attempting Ollama...');
        const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
            model: 'llama3:latest',
            prompt: prompt,
            stream: false
        });
        return response.data.response;
    } catch (error) {
        console.error('Ollama Error:', error.message);
        return null;
    }
};

const queryGemini = async (prompt) => {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'your_gemini_api_key_here') {
        console.log('Gemini API key missing or default.');
        return null;
    }
    try {
        console.log('Attempting Gemini (flash-lite)...');
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini Error:', error.message);
        return null;
    }
};

const getAnswer = async (query) => {
    console.log('getAnswer called with query:', query);
    const docs = await Doc.find(
        { $text: { $search: query } },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } }).limit(3);

    const context = docs.map(d => `${d.title}: ${d.content}`).join('\n\n');

    const prompt = `
  You are a helpful AI assistant for onboarding new freshers at a company.
  Use the following internal company documents to answer the user's question.
  If the answer is found in the documents, prioritize that information.
  If the documents don't help, you can use your general knowledge, but mention that it's general advice.
  Keep the tone encouraging, professional, and simplified for a junior developer.

  Context:
  ${context}

  Question:
  ${query}

  Answer:
  `;

    // Try Gemini first
    let answer = await queryGemini(prompt);

    // fallback to Ollama if Gemini failed or key missing
    if (!answer) {
        console.log('Gemini failed or unavailable. Falling back to Ollama...');
        answer = await queryOllama(prompt);
    }

    if (!answer) {
        answer = "I'm sorry, I'm having trouble connecting to both my cloud and local AI brains right now.";
    }

    return {
        answer,
        sources: docs.map(d => d.title)
    };
};

module.exports = { getAnswer };
