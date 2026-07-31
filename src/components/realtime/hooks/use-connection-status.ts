import { useState, useEffect } from "react";
import type { Socket } from "socket.io-client";

export function useConnectionStatus(socket: Socket | null) {
  const [status, setStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected");
  
  useEffect(() => {
    if (!socket) return;
    const onConnect = () => setStatus("connected");
    const onDisconnect = () => setStatus("disconnected");
    const onConnectError = () => setStatus("connecting");
    
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    if (socket.connected) setStatus("connected");
    
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
    };
  }, [socket]);
  
  return status;
}
