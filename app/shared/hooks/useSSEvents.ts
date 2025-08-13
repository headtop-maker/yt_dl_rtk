import {useState} from "react";
import EventSource from "react-native-sse";
import {DEV_API} from "../models/constants";

export const useSSEvents = <T>() => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>(null);

  const eventSource = new EventSource(`${DEV_API}/uploadVideo/event/`, {
    withCredentials: true,
    headers: {
      // Add headers if any
    },
  });

  const handleSSEConnect = () => {
    eventSource.addEventListener("open", (event: unknown) => {
      console.log("Open SSE connection.", event);
    });

    eventSource.addEventListener("message", (event: {data: null | string}) => {
      if (!!event && "data" in event && event.data !== null) {
        setData(JSON.parse(event.data));
      }

      console.log("New message event:", event.data);
    });

    eventSource.addEventListener("error", (event: any) => {
      if (event.type === "error") {
        setError(event.message);
        console.error("Connection error:", event.message);
      } else if (event.type === "exception") {
        setError(event.message);
        console.error("Error:", event.message, event.error);
      }
    });
  };

  const cleanSSEConnect = () => {
    eventSource.close();
  };

  return {data, error, handleSSEConnect, cleanSSEConnect};
};
