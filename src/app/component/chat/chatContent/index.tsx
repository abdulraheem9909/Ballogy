import React, { useState, useRef, useEffect } from "react";
import "./chat.css";
import { PiPaperPlaneRightBold, PiChatBold } from "react-icons/pi";
import ChatItem from "./chatItem";
import useChat from "./useChatContent";
import ChatLoader from "../../common/loaders/chat_loader";
import Avatar from "../../common/avatar";
import Sidebar from "../../common/sidebar";
import { getSessionId, getUserId } from "@/utils/helper";
import ChatsLoader from "../../common/loaders/chatlist_loader";
import Image from "next/image";
import logoIcon from ".././../../../assets/logo.svg";
import NoChatData from "./noChatData";

const ChatContent: React.FC = () => {
  const {
    chat,
    error,
    loading,
    messagesEndRef,
    onStateChange,
    msg,
    handleKeyPress,
    onMsgSend,
    fetchDataForSession,
    initiateNewChat,
    loadingList
  } = useChat();
  const userId = getUserId();
  const sessionId = getSessionId();

  return (
    <div className="main__chatcontent">
      <Sidebar
        userId={userId}
        sessionId={sessionId}
        fetchDataForSession={fetchDataForSession}
        initiateNewChat={initiateNewChat}
      >
        <div className="content__body">
          <div className="chat__items">
            {loadingList ? (
              <>
                <ChatsLoader />
                <ChatsLoader />
                <ChatsLoader />
              </>
            ) : chat?.length > 0 ? (
              chat.map((itm, index) => (
                <ChatItem
                  key={itm._id}
                  user={itm.type}
                  msg={itm.msg}
                  image={itm.image}
                />
              ))
            ) : (
              <NoChatData onMsgSend={onMsgSend} />
            )}
            {loading && (
              <div className="chat_loader_wrapper">
                <Avatar isOnline="active" user={"AI"} />
                <ChatLoader />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className={`content__footer`}>
          <div className="sendNewMessage">
            <input
              type="text"
              placeholder="Type a message here"
              onChange={onStateChange}
              value={msg}
              onKeyDown={handleKeyPress}
              disabled={loading}
            />
            <button
              className="btnSendMsg"
              id="sendMsgBtn"
              onClick={() => onMsgSend()}
            >
              <PiPaperPlaneRightBold />
            </button>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default ChatContent;
