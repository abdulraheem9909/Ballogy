import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import {
  getUserId,
  getSessionId,
  setUserId,
  setSessionId,
  removeSessionId
} from "@/utils/helper";
import HTTP_REQUEST from "@/utils/axiosConfig";

interface ChatEntry {
  _id: number;
  type: "Human" | "AI";
  msg: string;
  image: string;
}

interface UseChatResult {
  chat: ChatEntry[];
  error: string | null;
  loading: boolean;
  onMsgSend: (message?: string) => Promise<void>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onStateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  msg: string;
  handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  fetchDataForSession: any;
  initiateNewChat: any;
  loadingList: boolean;
}

const useChat = (): UseChatResult => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<ChatEntry[]>([]);
  const [msg, setMsg] = useState<string>("");
  const userId = getUserId();
  const sessionId = getSessionId();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onMsgSend();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    sessionId && fetchDataForSession(sessionId);
    scrollToBottom();
  }, []);

  const onStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const onMsgSend = async (message?: string) => {
    if (msg !== "" || message !== "") {
      const msgChat: any = [
        ...chat,
        {
          _id: chat.length + 1,
          type: "Human",
          msg: message ? message : msg
        }
      ];
      setChat(msgChat);
      setMsg("");
      setLoading(true);
      setError(null);
      const obj = {
        msg: message ? message : msg,
        ...(userId && { userId }),
        ...(sessionId && { sessionId }),
        type: "Human",
        chat: chat,
        user:{}
      };
      try {
        const response = await HTTP_REQUEST.post(`/chat`, obj);

        const newChat = [
          ...msgChat,
          {
            _id: msgChat.length + 1,
            type: "AI",
            msg: response.data.msg
          }
        ];
        !userId && setUserId(response.data.userId);
        !sessionId && setSessionId(response.data.sessionId);
        setChat(newChat);
        setMsg("");
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message || error.message);
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const fetchDataForSession = async (Id: string) => {
    sessionId !== Id && setSessionId(Id);
    setLoadingList(true);
    try {
      const response = await HTTP_REQUEST.get(
        `/chat?userId=${userId}&sessionId=${Id}`
      );

      setChat(response?.data);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || error.message);
      } else {
        setError(error.message);
      }
    } finally {
      setLoadingList(false);
      setLoading(false);
    }
  };

  const initiateNewChat = () => {
    removeSessionId();
    setChat([]);
    setMsg("");
  };

  return {
    chat,
    error,
    loading,
    onMsgSend,
    messagesEndRef,
    onStateChange,
    msg,
    handleKeyPress,
    fetchDataForSession,
    initiateNewChat,
    loadingList
  };
};

export default useChat;
