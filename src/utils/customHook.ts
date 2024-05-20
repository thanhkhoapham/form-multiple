import { useEffect, useState } from 'react';
// 
export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const useDebouncedInputValues = (inputValues: { [key: number]: string }, delay: number) => {
  const [debouncedValues, setDebouncedValues] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const handlers = Object.keys(inputValues).map(key => {
      const index = parseInt(key, 10);
      const handler = setTimeout(() => {
        setDebouncedValues(prev => ({ ...prev, [index]: inputValues[index] }));
      }, delay);
      return handler;
    });

    return () => {
      handlers.forEach(handler => clearTimeout(handler));
    };
  }, [inputValues, delay]);

  return debouncedValues;
}