import { useRef, useCallback } from 'react';

export default function ResizeHandle({ onResize }) {
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startHeight = useRef(0);

    const handleMouseDown = useCallback((e) => {
        isDragging.current = true;
        startY.current = e.clientY;
        startHeight.current = parseInt(document.documentElement.style.getPropertyValue('--output-h') || '240');

        document.body.style.cursor = 'ns-resize';
        document.body.style.userSelect = 'none';

        const handleMouseMove = (e) => {
            if (!isDragging.current) return;
            const delta = startY.current - e.clientY;
            const newHeight = Math.max(80, Math.min(600, startHeight.current + delta));
            onResize(newHeight);
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [onResize]);

    return (
        <div
            className="resize-handle"
            onMouseDown={handleMouseDown}
        />
    );
}
