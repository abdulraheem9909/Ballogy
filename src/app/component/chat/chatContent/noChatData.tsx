import React from "react";
import Image from "next/image";
import logoIcon from "../../../../assets/logo.svg";

interface Props {
  onMsgSend: (message?: string | undefined) => Promise<void>;
}

const q1 = "Which player has the most career blocks in the Finals?";
const q2 = "Who is the youngest player to score 10,000 points in NBA history?";
const q3 =
  "Which team holds the record for the most consecutive NBA championships?";
const q4 = "What is the highest-scoring game in NBA history?";

const NoChatData: React.FC<Props> = ({ onMsgSend }: Props) => {
  return (
    <div className="chat_noData">
      <Image priority src={logoIcon} alt="Logo" className="chat_noData_icon" />
      <p className="chat_noData_title">{"Ballogy"}</p>
      <p className="chat_noData_heading">How can I help you today?</p>
      <p className="chat_noData_text">
        You can ask me anything related to Basketball.
      </p>
      <div className="chat_noData_cardWrapper">
        <div className="chat_noData_card" onClick={() => onMsgSend(q1)}>
          {q1}
        </div>
        <div className="chat_noData_card" onClick={() => onMsgSend(q2)}>
          {q2}
        </div>
        <div className="chat_noData_card" onClick={() => onMsgSend(q3)}>
          {q3}
        </div>
        <div className="chat_noData_card" onClick={() => onMsgSend(q4)}>
          {q4}
        </div>
      </div>
    </div>
  );
};

export default NoChatData;
