import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from '../utils/prompts';

let genAI = null;

function getClient(apiKey) {
    if (!genAI || genAI._apiKey !== apiKey) {
        genAI = new GoogleGenerativeAI(apiKey);
        genAI._apiKey = apiKey;
    }
    return genAI;
}

export function useGemini(apiKey) {
    const askAI = async (prompt, onChunk) => {
        if (!apiKey) {
            throw new Error('No API key provided. Please enter your Gemini API key.');
        }

        const client = getClient(apiKey);
        const model = client.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: SYSTEM_PROMPT,
        });

        const result = await model.generateContentStream(prompt);

        let fullText = '';
        for await (const chunk of result.stream) {
            const text = chunk.text();
            fullText += text;
            if (onChunk) onChunk(text, fullText);
        }

        return fullText;
    };

    return { askAI };
}
