import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';

interface ChatBoxProps {
    className?: string;
}

const ChatBox = ({ className }: ChatBoxProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const isClicked = useRef<boolean>(false);
    const coords = useRef<{ startX: number, startY: number, lastX: number, lastY: number }>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        isClicked.current = true;
        coords.current.startX = e.clientX;
        coords.current.startY = e.clientY;
    };

    const handleMouseUp = () => {
        isClicked.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isClicked.current) return;
        const deltaX = e.clientX - coords.current.startX;
        const deltaY = e.clientY - coords.current.startY;
        let nextX = coords.current.lastX + deltaX;
        let nextY = coords.current.lastY + deltaY;

        // Restrict movement within the container
        const container = containerRef.current;
        if (container) {
            const width = isDialogOpen ? dialogRef.current?.clientWidth : buttonRef.current?.clientWidth
            const height = isDialogOpen ? dialogRef.current?.clientHeight : buttonRef.current?.clientHeight

            nextX = Math.max(0, Math.min(nextX, container.clientWidth - (width ?? 0)));
            nextY = Math.max(0, Math.min(nextY, container.clientHeight - (height ?? 0)));
        }

        setPosition({ x: nextX, y: nextY });
        coords.current.lastX = nextX;
        coords.current.lastY = nextY;
    };

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setPosition({ x: 0, y: 0 }); // Reset position or manage accordingly
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseup', handleMouseUp);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDialogOpen]);

    return (
        <div ref={containerRef} className="container">
            {!isDialogOpen && (
                <Button ref={buttonRef} className="button" onMouseDown={handleMouseDown} onClick={openDialog} style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}>
                    Open Dialog
                </Button>
            )}
            {isDialogOpen && (
                <div ref={dialogRef} className="dialog" onMouseDown={handleMouseDown} style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px`, width: '100px', height: '100px', backgroundColor: 'lightgray' }}>
                    <Button onClick={closeDialog}>Close Dialog</Button>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
