// Judge0 CE public instance
const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = ''; // Optional: set for higher rate limits

async function submitCode(sourceCode, languageId, stdin = '') {
    const headers = {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    };
    if (RAPIDAPI_KEY) headers['X-RapidAPI-Key'] = RAPIDAPI_KEY;

    // Use the free public instance instead if no key
    const baseUrl = RAPIDAPI_KEY ? JUDGE0_URL : 'https://ce.judge0.com';

    const res = await fetch(`${baseUrl}/submissions?base64_encoded=false&wait=true`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            source_code: sourceCode,
            language_id: languageId,
            stdin,
        }),
    });

    if (!res.ok) {
        throw new Error(`Judge0 error: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export function useJudge0() {
    const runCode = async (sourceCode, languageId, stdin = '') => {
        const startTime = performance.now();

        try {
            const result = await submitCode(sourceCode, languageId, stdin);
            const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);

            const stdout = result.stdout || '';
            const stderr = result.stderr || '';
            const compileOutput = result.compile_output || '';
            const statusDesc = result.status?.description || 'Unknown';
            const isError = result.status?.id > 3; // 1=queued,2=processing,3=accepted

            return {
                stdout,
                stderr: stderr || compileOutput,
                error: isError,
                status: statusDesc,
                elapsed,
                memory: result.memory,
                time: result.time,
            };
        } catch (e) {
            const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
            return {
                stdout: '',
                stderr: e.message,
                error: true,
                status: 'Error',
                elapsed,
            };
        }
    };

    return { runCode };
}
