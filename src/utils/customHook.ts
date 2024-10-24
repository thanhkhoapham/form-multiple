import { useEffect, useState } from 'react';
import { APP_NAME, SESSION_STORAGE } from '..';
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



export const useBroadcastChannel = () => {
  const [sessionId, setSesionId] = useState(localStorage.getItem(SESSION_STORAGE) ?? "");

  useEffect(() => {
    const channel = new BroadcastChannel(APP_NAME);

    channel.onmessage = (event) => {
      if (event.data.action === "newSession") {
        localStorage.setItem(SESSION_STORAGE, event.data[SESSION_STORAGE]);
        setSesionId(event.data[SESSION_STORAGE]);
      } else if (event.data.action === "clearSession") {
        localStorage.removeItem(SESSION_STORAGE);
        setSesionId("");
      };

      return () => {
        channel.close();
      };
    }
  }, []);

  return sessionId;
}