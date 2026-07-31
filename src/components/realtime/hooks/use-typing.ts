import { useState, useCallback, useEffect } from "react";
import type { Socket } from "socket.io-client";
import type { User } from "@/contexts/socketio";

export function useTyping(
  socket: Socket | null,
  currentUser: User | null | undefined,
  scrollToBottom: (smooth?: boolean) => void,
  isAtBottomRef: React.MutableRefObject<boolean>
) {
  const [typingUsers, setTypingUsers] = useState<Map<string, { username: string }>>(new Map());

  const handleTyping = useCallback(() => {
    if (!socket || !currentUser) return;
    socket.emit("typing", currentUser);
  }, [socket, currentUser]);

  const getTypingText = useCallback(() => {
    if (typingUsers.size === 0) return null;
    const names = Array.from(typingUsers.values()).map(u => u.username);
    if (names.length === 1) return `${names[0]} is typing...`;
    if (names.length === 2) return `${names[0]} and ${names[1]} are typing...`;
    return `${names.length} people are typing...`;
  }, [typingUsers]);

  useEffect(() => {
    if (!socket) return;
    const onTyping = (data: any) => {
      let newMap = new Map<string, { username: string }>();
      if (Array.isArray(data)) {
        data.forEach((u: any) => newMap.set(u.id || u.username, { username: u.username || u.name }));
      } else if (data instanceof Map) {
        newMap = new Map(data);
      } else if (typeof data === 'object' && data !== null) {
        Object.keys(data).forEach(k => newMap.set(k, { username: data[k].username || data[k].name }));
      }
      setTypingUsers(newMap);
      if (isAtBottomRef.current) {
        scrollToBottom();
      }
    };
    socket.on("typing", onTyping);
    return () => {
      socket.off("typing", onTyping);
    };
  }, [socket, scrollToBottom, isAtBottomRef]);

  return { typingUsers, handleTyping, getTypingText };
}
