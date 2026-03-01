export const SYSTEM_PROMPT = `You are PyAI, an expert Python programming assistant embedded in an online Python code editor. You help users write, understand, debug, and optimize Python code.

Guidelines:
- Be concise and practical
- Always format code in markdown code blocks with python syntax highlighting
- Explain concepts clearly but briefly
- When fixing bugs, explain what was wrong and why
- When optimizing, explain the performance improvement
- Use Python best practices and PEP 8 style`;

export const buildExplainPrompt = (code) => `
Please explain the following Python code clearly and concisely. Break down what each part does:

\`\`\`python
${code}
\`\`\`

Provide:
1. A brief overview of what the code does
2. Step-by-step explanation of key parts
3. Any important concepts used
`;

export const buildFixBugsPrompt = (code, error = '') => `
Please analyze and fix any bugs in this Python code:

\`\`\`python
${code}
\`\`\`

${error ? `Error encountered:\n\`\`\`\n${error}\n\`\`\`` : ''}

Provide:
1. What bugs/issues you found
2. The fixed code
3. Brief explanation of each fix
`;

export const buildOptimizePrompt = (code) => `
Please optimize this Python code for better performance and readability:

\`\`\`python
${code}
\`\`\`

Provide:
1. The optimized code
2. What improvements were made and why
3. Performance/readability benefits
`;

export const buildAddCommentsPrompt = (code) => `
Please add clear, helpful docstrings and inline comments to this Python code:

\`\`\`python
${code}
\`\`\`

Return the fully commented version of the code following Python best practices (PEP 257 for docstrings).
`;

export const buildChatPrompt = (userMessage, code) => `
${code ? `Current code in editor:\n\`\`\`python\n${code}\n\`\`\`\n\n` : ''}User question: ${userMessage}
`;
