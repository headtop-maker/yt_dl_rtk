import { useEffect, useRef, useState } from 'react';
import EventSource, { EventSourceListener } from 'react-native-sse';
import { DEV_API } from '../models/constants';

export const useSSEvents = <T>() => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource>(null);

  useEffect(() => {
    eventSourceRef.current = new EventSource(
      `${DEV_API}/uploadVideo/event/?id=1234`,
      {
        withCredentials: true,
        headers: {
          // Add headers if any
        },
      }
    );
    const listener: EventSourceListener = (event) => {
      if (event.type === 'open') {
        console.log('Open SSE connection.');
      } else if (event.type === 'error') {
        setError(event.message);
        console.error('Connection error:', event.message);
      } else if (event.type === 'exception') {
        setError(event.message);
        console.error('Error:', event.message, event.error);
      } else if (event.type === 'message') {
        if (!!event && 'data' in event && event.data !== null) {
          setData(JSON.parse(event.data));
        }
        console.log('New message event:', event.data);
      }
    };

    eventSourceRef.current.addEventListener('open', listener);
    eventSourceRef.current.addEventListener('message', listener);
    eventSourceRef.current.addEventListener('error', listener);

    return () => {
      if (eventSourceRef.current) {
        console.log('clear sse');
        eventSourceRef.current.removeAllEventListeners();
        eventSourceRef.current.close();
      }
    };
  }, []);

  return { data, error };
};
