import React, { useState, useEffect } from 'react';
import { Button, Popover, IconButton, Typography } from '@mui/material';
import MinimizeIcon from '@mui/icons-material/Minimize';

interface Position {
  x: number;
  y: number;
}

function Draggable() {
  const marginPercent = 5; // Khoảng cách từ các góc đến component là 5% của chiều rộng màn hình
  const componentWidthPercent = 30; // Chiều rộng của component là 30% chiều rộng màn hình
  const componentHeightPercent = 20; // Chiều cao của component là 20% chiều cao màn hình
  const headerHeight = 50; // Chiều cao cố định của header

  const calculatePosition = () => ({
    x: (marginPercent / 100) * window.innerWidth,
    y: window.innerHeight - (componentHeightPercent / 100) * window.innerHeight - (marginPercent / 100) * window.innerHeight
  });

  const [position, setPosition] = useState<Position>(calculatePosition());
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (!visible) {
        setPosition(calculatePosition());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [visible]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setVisible(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setVisible(false);
  };

  const handleMinimize = () => {
    handleClose();
  };

  const isOpen = Boolean(anchorEl);

  return (
    <div style={{ height: `calc(100vh - ${headerHeight}px)`, width: '100vw', position: 'relative' }}>
      {!isOpen && (
        <Button variant="contained" color="primary" onClick={handleOpen} style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}>
          Open Popover
        </Button>
      )}
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{
          width: `${(componentWidthPercent / 100) * window.innerWidth}px`,
          height: `${(componentHeightPercent / 100) * window.innerHeight - 50}px` // Subtract 50px for the header
        }}
      >
        <div style={{ padding: 20, width: '100%', height: '100%' }}>
          <Typography variant="h6" component="div" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Popover Content
            <IconButton onClick={handleMinimize}>
              <MinimizeIcon />
            </IconButton>
          </Typography>
          <Typography variant="body1" component="div">
            Here's some content in the popover. You can drag this around too!
          </Typography>
        </div>
      </Popover>
    </div>
  );
}

export default Draggable;
