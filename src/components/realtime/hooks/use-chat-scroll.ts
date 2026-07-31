import { useRef, useCallback, useEffect, useState } from "react";

export function useChatScroll(
  isOpen: boolean,
  msgsLength: number,
  currentUserId?: string,
  lastMsgSessionId?: string,
  firstMsgId?: string
) {
  const chatContainer = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [unreads, setUnreads] = useState(0);

  const scrollToBottom = useCallback((smooth?: boolean) => {
    if (chatContainer.current) {
      chatContainer.current.scrollTo({
        top: chatContainer.current.scrollHeight,
        behavior: smooth === false ? "auto" : "smooth"
      });
      isAtBottomRef.current = true;
      setShowScrollButton(false);
      setUnreads(0);
    }
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    isAtBottomRef.current = isAtBottom;
    setShowScrollButton(!isAtBottom);
    if (isAtBottom) {
      setUnreads(0);
    }
  }, []);

  useEffect(() => {
    if (isOpen && isAtBottomRef.current) {
      scrollToBottom();
    }
  }, [isOpen, msgsLength, scrollToBottom]);

  useEffect(() => {
    if (!isAtBottomRef.current) {
      setUnreads((prev) => prev + 1);
    }
  }, [msgsLength]);

  return { chatContainer, showScrollButton, unreads, scrollToBottom, isAtBottomRef, handleScroll };
}
