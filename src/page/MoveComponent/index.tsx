import React, { useState } from 'react';

interface Position {
  x: number;
  y: number;
}

function DraggableComponent() {
  const [position, setPosition] = useState<Position>({ x: 20, y: window.innerHeight - 40 });
  const [dragOffset, setDragOffset] = useState<Position | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Lưu lại vị trí tương đối của chuột so với góc trên bên trái của component
    setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (dragOffset) {
      // Cập nhật vị trí mới dựa vào vị trí thả chuột trừ đi offset đã lưu
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
      // Xóa drag offset sau khi đã thả
      setDragOffset(null);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '150px',
          height: '150px',
          backgroundColor: 'red',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'move',
        }}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        Drag me!
      </div>
    </div>
  );
}

export default DraggableComponent;
