import { useEffect, useRef } from "react";
import { API_BASE_URL } from "@/lib/api-config";

/**
 * Reusable React Hook to handle Server-Sent Events (SSE) updates from the backend.
 * Automatically synchronizes database modifications in real-time.
 * 
 * @param onUpdate Callback triggered with the full updated portfolio payload.
 */
export function useLiveUpdates(onUpdate: (data: any) => void) {
  const onUpdateRef = useRef(onUpdate);

  // Keep callback reference updated without triggering dependency updates
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    // Connect to the backend Server-Sent Events stream with credentials
    const eventSource = new EventSource(`${API_BASE_URL}/api/live-updates`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === "portfolio_update" && payload.data) {
          onUpdateRef.current(payload.data);
        }
      } catch (err) {
        console.error("Failed to parse dynamic live update event payload:", err);
      }
    };

    eventSource.onerror = (err) => {
      // Log errors but do NOT close the eventSource so that the browser's
      // standard automatic reconnection mechanism can retry.
      console.warn("EventSource stream connection error, browser will attempt automatic reconnection:", err);
    };

    // Clean up EventSource connection on component unmount
    return () => {
      eventSource.close();
    };
  }, []);
}
