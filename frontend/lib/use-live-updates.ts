import { useEffect } from "react";
import { API_BASE_URL } from "@/lib/api-config";

/**
 * Reusable React Hook to handle Server-Sent Events (SSE) updates from the backend.
 * Automatically synchronizes database modifications in real-time.
 * 
 * @param onUpdate Callback triggered with the full updated portfolio payload.
 */
export function useLiveUpdates(onUpdate: (data: any) => void) {
  useEffect(() => {
    // Connect to the backend Server-Sent Events stream
    const eventSource = new EventSource(`${API_BASE_URL}/api/live-updates`);

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === "portfolio_update" && payload.data) {
          onUpdate(payload.data);
        }
      } catch (err) {
        console.error("Failed to parse dynamic live update event payload:", err);
      }
    };

    eventSource.onerror = (err) => {
      // Gracefully close on error to allow standard manual reload fallbacks
      console.warn("EventSource stream connection error, closing:", err);
      eventSource.close();
    };

    // Clean up EventSource connection on component unmount
    return () => {
      eventSource.close();
    };
  }, [onUpdate]);
}
