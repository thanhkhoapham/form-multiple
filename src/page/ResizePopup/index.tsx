import React, { useState, useRef } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NorthWestOutlinedIcon from '@mui/icons-material/NorthWestOutlined';
import Typing from '../../components/Typing';

const ResizableBox: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [size, setSize] = useState({ width: 200, height: 300 });  // Khởi tạo kích thước ban đầu
    const posRef = useRef({ x: 0, y: 0 });

    const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
        posRef.current = { x: e.clientX, y: e.clientY };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - posRef.current.x;
        const dy = e.clientY - posRef.current.y;
        setSize(prevSize => ({
            width: Math.min(800, Math.max(200, prevSize.width - dx)),
            height: Math.min(window.innerHeight - 300, Math.max(300, prevSize.height - dy))
        }));
        posRef.current = { x: e.clientX, y: e.clientY };
    };

    const stopResize = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResize);
    };

    return (
        <div style={{ position: 'fixed', bottom: 20, right: 20 }}> asdasdasd
            <Typing />

            <Button onClick={() => setIsOpen(!isOpen)} style={{ position: 'absolute', bottom: 20, right: 20 }}>
                {isOpen ? 'Close Chat' : 'Open Chat'}
            </Button>
            {isOpen && (
                <Box
                    sx={{
                        width: size.width,
                        height: size.height,
                        backgroundColor: 'background.paper',
                        border: 1,
                        borderColor: 'divider',
                        boxSizing: 'border-box',
                        overflow: 'auto',
                        zIndex: 1300,
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            p: 1,
                        }}
                    >
                        Chat Box
                        <IconButton onClick={() => setIsOpen(false)} color="inherit">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <div onMouseDown={startResize} style={{ position: 'absolute', top: -5, left: 0, cursor: 'nwse-resize' }}>
                        <NorthWestOutlinedIcon style={{ color: 'black', fontSize: "15px" }}/>
                    </div>
                    <Box sx={{ p: 2 }}>
                        {/* Chat content goes here */}
                        Your chat content here...
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default ResizableBox;
