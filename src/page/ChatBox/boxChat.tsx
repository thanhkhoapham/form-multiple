import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Paper, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import Draggable from 'react-draggable';
import { CSSProperties } from '@mui/material/styles/createMixins';

interface ChatBoxProps {
    className?: string;
}

const ChatBox2 = ({className}: ChatBoxProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    const isClicked = useRef<boolean>(false);

    const coords = useRef<{
      startX: number,
      startY: number,
      lastX: number,
      lastY: number
    }>({
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0
    })

    useEffect(() => {
      if (!boxRef.current || !containerRef.current) return;

      const box = boxRef.current;
      const container = containerRef.current;

      const onMouseDown = (e: MouseEvent) => {
        isClicked.current = true;
        coords.current.startX = e.clientX;
        coords.current.startY = e.clientY;
      }

      const onMouseUp = (e: MouseEvent) => {
        isClicked.current = false;
        coords.current.lastX = box.offsetLeft;
        coords.current.lastY = box.offsetTop;
      }

      const onMouseMove = (e: MouseEvent) => {
        if (!isClicked.current) return;

        const deltaX = e.clientX - coords.current.startX;
        const deltaY = e.clientY - coords.current.startY;
        let nextX = coords.current.lastX + deltaX;
        let nextY = coords.current.lastY + deltaY;

        // Giới hạn di chuyển không cho box vượt quá phạm vi container
        nextX = Math.max(0, Math.min(nextX, container.clientWidth - box.clientWidth));
        nextY = Math.max(0, Math.min(nextY, container.clientHeight - box.clientHeight));

        box.style.left = `${nextX}px`;
        box.style.top = `${nextY}px`;
      }

      box.addEventListener('mousedown', onMouseDown);
      box.addEventListener('mouseup', onMouseUp);
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseUp);

      const cleanup = () => {
        box.removeEventListener('mousedown', onMouseDown);
        box.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseUp);
      }

      return cleanup;
    }, [])

    return (
        <div ref={containerRef} className="container">
          <div ref={boxRef} className="box"></div>
        </div>
    );
};

export default ChatBox2;
