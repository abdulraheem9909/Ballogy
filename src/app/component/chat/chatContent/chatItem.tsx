import React from "react";
import Avatar from "../../common/avatar/index";
import Markdown from "react-markdown";

interface ChatItemProps {
  user?: string;
  msg: string;
  image: string;
  name?: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ user, msg, image, name }) => {
  return (
    <div className={`chat__item `}>
      <div className="chat__item__content">
        <span className="chat__heading">
          {user === "AI" ? "Ballogy" : "You"}
        </span>
        <div className="chat__msg">{<Markdown>{msg}</Markdown>}</div>
        <div className="chat__meta">
          {/* <span>16 mins ago</span> */}
          {/* <span>Seen 1.03PM</span> */}
        </div>
      </div>
      <div>
        <Avatar isOnline="active" user={user} name={name} />
      </div>
    </div>
  );
};

export default ChatItem;
