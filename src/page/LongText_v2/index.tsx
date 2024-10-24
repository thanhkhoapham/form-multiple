import React, { useState, useRef, useEffect } from 'react';

interface ExpandableTextProps {
  text: string;
  lineClamp: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, lineClamp }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const checkIfTruncated = () => {
    if (textRef.current) {
      const { clientHeight, scrollHeight } = textRef.current;
      const newIsTruncated = clientHeight < scrollHeight;
      setIsTruncated(newIsTruncated);
      
      if (!newIsTruncated) {
        setIsExpanded(false);
      }
    }
  };

  useEffect(() => {
    checkIfTruncated();
    window.addEventListener('resize', checkIfTruncated);
    return () => {
      window.removeEventListener('resize', checkIfTruncated);
    };
  }, [text, lineClamp]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        ref={textRef}
        style={{
          display: '-webkit-box',
          WebkitLineClamp: isExpanded ? 'unset' : lineClamp,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {text}
      </div>
      {isTruncated && (
        <button onClick={toggleExpand}>
          {isExpanded ? 'Less' : 'More'}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
