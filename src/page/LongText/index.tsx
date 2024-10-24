import React, { useState, useRef, useEffect, ReactElement } from 'react';
import { Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

interface ExpandableTextProps {
  text: string;
}

const TextContainer = styled('div')<{ expanded: boolean }>(({ expanded }) => ({
  display: '-webkit-box',
  WebkitLineClamp: expanded ? 'unset' : 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const ExpandableText = ({ text }: ExpandableTextProps): ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowed(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [text]);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div>
      <TextContainer ref={textRef} expanded={expanded}>
        <Typography variant="body1" component="span">
          {text}
        </Typography>
      </TextContainer>
      {isOverflowed && (
        <Button onClick={toggleExpanded} size="small">
          {expanded ? 'less' : 'more'}
        </Button>
      )}
    </div>
  );
};

export default ExpandableText;
