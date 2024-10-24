import React, { useState, useRef, useEffect } from 'react';
import './styles.scss';

interface ExpandableTextProps {
  text: string;
  lineClamp: number;
  monitorResize?: boolean;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, lineClamp, monitorResize = false }) => {
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
    if (monitorResize) {
      window.addEventListener('resize', checkIfTruncated);
      return () => {
        window.removeEventListener('resize', checkIfTruncated);
      };
    }
  }, [text, lineClamp, monitorResize]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="expandable-text">
      <div
        ref={textRef}
        className="expandable-text-content"
        style={{
          WebkitLineClamp: isExpanded ? 'unset' : lineClamp,
        }}
      >
        {text}
        {isTruncated && !isExpanded && (
          <span
            onClick={toggleExpand}
            className="expandable-text-button"
          >
            ... More
          </span>
        )}
        {isExpanded && (
          <span
            onClick={toggleExpand}
            className="expandable-text-button static"
          >
            Less
          </span>
        )}
      </div>
    </div>
  );
};

export default ExpandableText;
