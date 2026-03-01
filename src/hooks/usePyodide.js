import { useState, useEffect, useRef } from 'react';

let pyodideInstance = null;
let loadingPromise = null;

export function usePyodide() {
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        loadPyodide();
    }, []);

    const loadPyodide = async () => {
        if (pyodideInstance) {
            setIsReady(true);
            return;
        }

        if (loadingPromise) {
            setIsLoading(true);
            try {
                await loadingPromise;
                setIsReady(true);
            } catch (e) {
                setLoadError(e.message);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        setIsLoading(true);
        loadingPromise = (async () => {
            const pyodide = await window.loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
            });
            pyodideInstance = pyodide;
            return pyodide;
        })();

        try {
            await loadingPromise;
            setIsReady(true);
        } catch (e) {
            setLoadError(e.message);
            loadingPromise = null;
        } finally {
            setIsLoading(false);
        }
    };

    const runCode = async (code) => {
        if (!pyodideInstance) {
            return { stdout: '', stderr: 'Python runtime not loaded yet. Please wait...', error: true };
        }

        const startTime = performance.now();
        let stdout = '';
        let stderr = '';
        let hasError = false;

        try {
            // Redirect stdout/stderr
            pyodideInstance.runPython(`
import sys
import io
_stdout_capture = io.StringIO()
_stderr_capture = io.StringIO()
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture
      `);

            await pyodideInstance.runPythonAsync(code);

            stdout = pyodideInstance.runPython('_stdout_capture.getvalue()');
            stderr = pyodideInstance.runPython('_stderr_capture.getvalue()');
        } catch (e) {
            stderr = e.message;
            hasError = true;
        } finally {
            try {
                pyodideInstance.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
        `);
            } catch (_) { }
        }

        const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
        return { stdout, stderr, error: hasError, elapsed };
    };

    return { isLoading, isReady, loadError, runCode };
}
