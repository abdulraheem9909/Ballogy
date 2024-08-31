import React from "react";
import "./chat_loader.css";

const ChatLoader: React.FC = () => {
  return (
    <div className="is-typing">
      <div className="jump1"></div>
      <div className="jump2"></div>
      <div className="jump3"></div>
    </div>
  );
};
export default ChatLoader;
